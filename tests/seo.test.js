import { describe, expect, it } from 'bun:test'
import {
  consolidateTags,
  createMarkdownPreview,
  getTagSlug,
  isIndexableTag
} from '../src/lib/data/seo.js'

describe('SEO data helpers', () => {
  it('consolidates tag labels that resolve to the same existing slug', () => {
    expect(consolidateTags(['SEO', 'seo', 'Mała Firma', 'mała firma'])).toEqual([
      { name: 'Mała Firma', slug: 'maa-firma', count: 2 },
      { name: 'SEO', slug: 'seo', count: 2 }
    ])
    expect(getTagSlug('Produktywność')).toBe('produktywno')
  })

  it('uses the same minimum count for tag indexability', () => {
    expect(isIndexableTag({ count: 1 })).toBe(false)
    expect(isIndexableTag({ count: 2 })).toBe(true)
  })

  it('renders Markdown previews while exposing plain text metadata', () => {
    const preview = createMarkdownPreview('## Poznaj **SEO** przez [audyt](/post/audyt).')

    expect(preview.html).toContain('<h2>Poznaj <strong>SEO</strong>')
    expect(preview.html).toContain('<a href="/post/audyt">audyt</a>')
    expect(preview.text).toBe('Poznaj SEO przez audyt.')
  })
})
