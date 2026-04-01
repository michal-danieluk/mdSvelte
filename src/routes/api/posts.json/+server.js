import { posts } from '$lib/data/posts'
import { json } from '@sveltejs/kit'

export const prerender = true

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  const searchIndex = posts.map(post => ({
    title: post.title,
    slug: post.slug,
    date: post.date,
    description: post.description || post.preview.text,
    tags: post.tags
  }))

  return json(searchIndex)
}
