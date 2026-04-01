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
  
  let relatedPosts = []
  try {
    relatedPosts = posts
      .filter((p) => p.slug !== slug)
      .map((p) => {
        const pTags = (p.tags || []).map(t => String(t).toLowerCase())
        const commonTags = pTags.filter((tag) => currentTags.includes(tag))
        return { ...p, score: commonTags.length }
      })
      .filter((p) => p.score > 0)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score
        return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
      })
      .slice(0, 3)
  } catch (e) {
    console.error('Error finding related posts:', e)
    relatedPosts = []
  }

  // Fallback: If no related posts by tags, show the latest 3 posts
  if (relatedPosts.length === 0) {
    relatedPosts = posts
      .filter((p) => p.slug !== slug)
      .slice(0, 3)
  }

  // Clean up relatedPosts to avoid circular references or unnecessary large data
  const cleanedRelatedPosts = relatedPosts.map(p => ({
    title: p.title,
    slug: p.slug,
    date: p.date,
    readingTime: p.readingTime
  }))

  return {
    post,
    relatedPosts: cleanedRelatedPosts
  }
}
