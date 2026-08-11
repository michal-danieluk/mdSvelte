import { describe, expect, it } from 'bun:test'
import {
  parseFrontmatter,
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
})
