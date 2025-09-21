import { posts, getFeaturedPosts } from '$lib/data/posts'
import { featured_posts } from '$lib/info.js'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return {
    posts: posts.slice(0, 5),
    featuredPosts: getFeaturedPosts(featured_posts)
  }
}
