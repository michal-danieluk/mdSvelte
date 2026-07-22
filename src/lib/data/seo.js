import { marked } from 'marked'
import { parse } from 'node-html-parser'

export const MIN_INDEXABLE_TAG_POSTS = 2

/** @param {string} tag */
export function getTagSlug(tag) {
  return tag
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

/** @param {string[]} tags */
export function consolidateTags(tags) {
  const tagsBySlug = new Map()

  for (const name of tags) {
    const slug = getTagSlug(name)
    const existingTag = tagsBySlug.get(slug)

    if (existingTag) {
      existingTag.count += 1
    } else {
      tagsBySlug.set(slug, { name, slug, count: 1 })
    }
  }

  return [...tagsBySlug.values()].sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name, 'pl')
  )
}

/** @param {{ count: number }} tag */
export function isIndexableTag(tag) {
  return tag.count >= MIN_INDEXABLE_TAG_POSTS
}

/** @param {string} markdown */
export function createMarkdownPreview(markdown) {
  const html = /** @type {string} */ (marked.parse(markdown, { async: false }))
  const preview = parse(html)

  return {
    html: preview.toString(),
    text: preview.text.replace(/\s+/g, ' ').trim()
  }
}
