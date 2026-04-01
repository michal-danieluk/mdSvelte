import { posts } from '$lib/data/posts'
import { error } from '@sveltejs/kit'

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const { slug } = params

  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    throw error(404, 'Post not found')
  }

  // Robust tag matching (case-insensitive)
  const currentTags = (post.tags || []).map(t => String(t).toLowerCase())
  
  let relatedPosts = posts
    .filter((p) => p.slug !== slug)
    .map((p) => {
      const pTags = (p.tags || []).map(t => String(t).toLowerCase())
      const commonTags = pTags.filter((tag) => currentTags.includes(tag))
      return { ...p, score: commonTags.length }
    })
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date))
    .slice(0, 3)

  // Fallback: If no related posts by tags, show the latest 3 posts
  if (relatedPosts.length === 0) {
    relatedPosts = posts
      .filter((p) => p.slug !== slug)
      .slice(0, 3)
  }

  return {
    post,
    relatedPosts
  }
}
