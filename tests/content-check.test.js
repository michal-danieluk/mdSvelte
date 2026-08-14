import { describe, expect, it } from 'bun:test'
import { mkdtemp, mkdir, symlink, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import {
  parseFrontmatter,
  resolveLocalAssetPath,
  slugFromPath,
  validateCollection,
  validatePost
} from '../scripts/check-content.mjs'

describe('content checks', () => {
  it('parses frontmatter without treating article text as metadata', () => {
    const source = `---
title: 'Przykładowy wpis'
date: '2026-08-11'
tags: ['SEO', 'Marketing']
description: 'Konkretny opis wpisu do wyników wyszukiwania.'
---

Treść z dwukropkiem: nadal jest treścią.`

    const result = parseFrontmatter(source)

    expect(result.metadata).toEqual({
      title: 'Przykładowy wpis',
      date: '2026-08-11',
      tags: ['SEO', 'Marketing'],
      description: 'Konkretny opis wpisu do wyników wyszukiwania.'
    })
    expect(result.body).toContain('Treść z dwukropkiem')
  })

  it('derives the public slug for flat and index posts', () => {
    expect(slugFromPath('/repo/posts/wpis.md')).toBe('wpis')
    expect(slugFromPath('/repo/posts/workflow/index.md')).toBe('workflow')
  })

  it('reports broken post links as errors and SEO quality issues as warnings', () => {
    const source = `---
title: 'Krótki tytuł'
date: '2026-08-11'
tags: []
description: 'Za krótko.'
---

[Dobry link](/post/istniejacy) i [zepsuty link](/post/brakujacy).`

    const result = validatePost({
      filePath: '/repo/posts/test.md',
      source,
      knownSlugs: new Set(['test', 'istniejacy'])
    })

    expect(result.errors).toContain('nieistniejący link wewnętrzny: /post/brakujacy')
    expect(result.warnings).toContain('brak tagów')
    expect(result.warnings).toContain('meta description ma 10 znaków; zalecane 120–160')
  })

  it('accepts a valid non-zero-padded date supported by the post loader', () => {
    const result = validatePost({
      filePath: '/repo/posts/starszy-wpis.md',
      source: `---\ntitle: 'Starszy wpis z bloga'\ndate: '2023-2-22'\n---\nTreść`,
      knownSlugs: new Set(['starszy-wpis'])
    })

    expect(result.errors).not.toContain('nieprawidłowa data: 2023-2-22')
  })

  it('rejects duplicate effective SEO titles across posts', () => {
    const posts = [
      {
        filePath: '/repo/posts/a.md',
        source: `---\ntitle: 'A'\nseoTitle: 'Ten sam title'\ndate: '2026-08-11'\n---\nA`
      },
      {
        filePath: '/repo/posts/b.md',
        source: `---\ntitle: 'B'\nseoTitle: 'Ten sam title'\ndate: '2026-08-11'\n---\nB`
      }
    ]

    const result = validateCollection(posts)

    expect(result.errors).toContain(
      'zduplikowany title SEO „Ten sam title”: /repo/posts/a.md, /repo/posts/b.md'
    )
  })

  it('rejects two source files that generate the same public route', () => {
    const posts = [
      {
        filePath: '/repo/posts/duplikat.md',
        source: `---\ntitle: 'Wpis A'\ndate: '2026-08-11'\n---\nA`
      },
      {
        filePath: '/repo/posts/duplikat/index.md',
        source: `---\ntitle: 'Wpis B'\ndate: '2026-08-11'\n---\nB`
      }
    ]

    const result = validateCollection(posts)

    expect(result.errors).toContain(
      'zduplikowana trasa /post/duplikat: /repo/posts/duplikat.md, /repo/posts/duplikat/index.md'
    )
  })

  it('rejects publishing placeholders and leaked chatbot citation tokens', () => {
    const result = validatePost({
      filePath: '/repo/posts/niegotowy.md',
      source: `---
title: 'Niegotowy wpis do publikacji'
date: '2026-08-11'
---

Tekst wymaga [UZUPEŁNIJ] i ma wyciek citeturn0search0.`,
      knownSlugs: new Set(['niegotowy'])
    })

    expect(result.errors).toContain('pozostawiony placeholder: [UZUPEŁNIJ]')
    expect(result.errors).toContain('wyciek technicznego tokenu cytowania: citeturn0search0')
  })

  it('rejects empty image alt text, unsupported formats and duplicate H2 anchors', () => {
    const result = validatePost({
      filePath: '/repo/posts/grafiki.md',
      source: `---
title: 'Grafiki w artykule testowym'
date: '2026-08-11'
---

## Ten sam nagłówek

![](/img/pusty-alt.webp)

## Ten sam nagłówek

![Diagram procesu](/img/proces.tiff)`,
      knownSlugs: new Set(['grafiki'])
    })

    expect(result.errors).toContain('pusty alt text obrazu: /img/pusty-alt.webp')
    expect(result.errors).toContain('nieobsługiwany format obrazu: /img/proces.tiff')
    expect(result.errors).toContain('zduplikowany nagłówek H2: Ten sam nagłówek')
  })

  it('checks whether local image files exist and warns about generic alt text', () => {
    const checkedPaths = []
    const result = validatePost({
      filePath: '/repo/posts/obrazy.md',
      source: `---
title: 'Obrazy w artykule testowym'
date: '2026-08-11'
---

![Obrazek](/img/brak.webp)`,
      knownSlugs: new Set(['obrazy']),
      assetExists: (imagePath) => {
        checkedPaths.push(imagePath)
        return false
      }
    })

    expect(checkedPaths).toEqual(['/img/brak.webp'])
    expect(result.errors).toContain('nieistniejący lokalny obraz: /img/brak.webp')
    expect(result.warnings).toContain('generyczny alt text obrazu: „Obrazek”')
  })

  it('rejects local images that escape the posts or static directories', () => {
    expect(() =>
      resolveLocalAssetPath({
        imagePath: '../../outside.webp',
        filePath: '/repo/posts/article.md',
        projectRoot: '/repo'
      })
    ).toThrow('wychodzi poza dozwolony katalog')

    expect(
      resolveLocalAssetPath({
        imagePath: '/img/posts/article/diagram.webp',
        filePath: '/repo/posts/article.md',
        projectRoot: '/repo'
      })
    ).toBe('/repo/static/img/posts/article/diagram.webp')
  })

  it('rejects a local image symlink that resolves outside the project', async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), 'content-assets-'))
    const posts = path.join(root, 'posts')
    const outside = path.join(path.dirname(root), `${path.basename(root)}-outside.webp`)
    const linkedImage = path.join(posts, 'linked.webp')
    await mkdir(posts)
    await writeFile(outside, 'outside')
    await symlink(outside, linkedImage)

    expect(() =>
      resolveLocalAssetPath({
        imagePath: './linked.webp',
        filePath: path.join(posts, 'article.md'),
        projectRoot: root
      })
    ).toThrow('symlinkiem poza dozwolony katalog')
  })

  it('reports malformed URL encoding instead of crashing content validation', () => {
    const result = validatePost({
      filePath: '/repo/posts/kodowanie.md',
      source: `---
title: 'Test nieprawidłowego kodowania URL'
date: '2026-08-11'
---

[Błędny link](/post/bledny%zz)

![Diagram procesu](/img/bledny%zz.webp)`,
      knownSlugs: new Set(['kodowanie']),
      assetExists: (imagePath) =>
        Boolean(
          resolveLocalAssetPath({
            imagePath,
            filePath: '/repo/posts/kodowanie.md',
            projectRoot: '/repo'
          })
        )
    })

    expect(result.errors).toContain('nieprawidłowo zakodowany link wewnętrzny: /post/bledny%zz')
    expect(result.errors).toContain('nieprawidłowa ścieżka lokalnego obrazu: /img/bledny%zz.webp')
  })

  it('rejects a second H1 in posts created by the new workflow but ignores code comments', () => {
    const result = validatePost({
      filePath: '/repo/posts/podwojny-h1.md',
      source: `---
title: 'Tytuł renderowany przez layout'
date: '2026-08-11'
workflow_status: approved
---

# Drugi H1 w treści

\`\`\`bash
# To jest komentarz w kodzie
\`\`\``,
      knownSlugs: new Set(['podwojny-h1'])
    })

    expect(result.errors).toContain(
      'nagłówek H1 w treści: layout artykułu renderuje H1 z pola title'
    )
    expect(result.errors.filter((error) => error.includes('nagłówek H1'))).toHaveLength(1)
  })
})
