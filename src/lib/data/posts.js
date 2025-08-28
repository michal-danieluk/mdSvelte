import { browser } from '$app/environment'
import { format } from 'date-fns'
import { parse } from 'node-html-parser'
import readingTime from 'reading-time'

// we require some server-side APIs to parse all metadata
if (browser) {
  throw new Error(`posts can only be imported server-side`)
}

// Get all posts and add metadata
export const posts = Object.entries(import.meta.glob('/posts/**/*.md', { eager: true }))
  .map(([filepath, module]) => {
    // In Svelte 5, mdsvex provides the HTML content directly
    const metadata = module.metadata || {}
    const htmlContent = module.html || ''
    const html = parse(htmlContent)

    // Safely get preview
    let preview
    if (metadata.preview) {
      preview = parse(metadata.preview)
    } else {
      const firstParagraph = html.querySelector('p')
      preview = firstParagraph || { toString: () => '', text: '' }
    }

    return {
      ...metadata,

      // generate the slug from the file path
      slug: filepath
        .replace(/(\/index)?\.md/, '')
        .split('/')
        .pop(),

      // whether or not this file is `my-post.md` or `my-post/index.md`
      // (needed to do correct dynamic import in posts/[slug].svelte)
      isIndexFile: filepath.endsWith('/index.md'),

      // format date as yyyy-MM-dd
      date: metadata.date
        ? format(
            // offset by timezone so that the date is correct
            addTimezoneOffset(new Date(metadata.date)),
            'yyyy-MM-dd'
          )
        : undefined,

      // process tags - ensure it's always an array
      tags: metadata.tags
        ? Array.isArray(metadata.tags)
          ? metadata.tags.map((tag) => tag.trim())
          : metadata.tags.split(',').map((tag) => tag.trim())
        : [],

      // include headings for table of contents
      headings: metadata.headings || [],

      preview: {
        html: preview.toString(),
        // text-only preview (i.e no html elements), used for SEO
        text: preview.text || preview.toString()
      },

      // get estimated reading time for the post
      readingTime: Math.ceil(readingTime(html.text || html.toString()).minutes) + ' min czyt.'
    }
  })
  // sort by date
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  // add references to the next/previous post
  .map((post, index, allPosts) => ({
    ...post,
    next: allPosts[index - 1],
    previous: allPosts[index + 1]
  }))

function addTimezoneOffset(date) {
  const offsetInMilliseconds = new Date().getTimezoneOffset() * 60 * 1000
  return new Date(new Date(date).getTime() + offsetInMilliseconds)
}

// Get all unique tags from all posts
export function getAllTags() {
  const allTags = posts.flatMap((post) => post.tags)
  const uniqueTags = [...new Set(allTags)]

  return uniqueTags
    .map((tag) => ({
      name: tag,
      slug: tag
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, ''),
      count: allTags.filter((t) => t === tag).length
    }))
    .sort((a, b) => b.count - a.count)
}

// Get posts by tag
export function getPostsByTag(tagSlug) {
  return posts.filter((post) =>
    post.tags.some(
      (tag) =>
        tag
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '') === tagSlug
    )
  )
}

// Get tag info by slug
export function getTagBySlug(tagSlug) {
  const tags = getAllTags()
  return tags.find((tag) => tag.slug === tagSlug)
}
