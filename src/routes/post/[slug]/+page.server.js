import { posts } from '$lib/data/posts'
import { error } from '@sveltejs/kit'

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const { slug } = params

  // get post with metadata
  const post = posts.find((post) => slug === post.slug)

  if (!post) {
    throw error(404, 'Post not found')
  }

  // Find related posts based on tags
  const relatedPosts = posts
    .filter((p) => p.slug !== post.slug) // exclude current post
    .map((p) => {
      const commonTags = p.tags.filter((tag) => post.tags.includes(tag))
      return { ...p, score: commonTags.length }
    })
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date))
    .slice(0, 3)

  return {
    post,
    relatedPosts
  }
}
