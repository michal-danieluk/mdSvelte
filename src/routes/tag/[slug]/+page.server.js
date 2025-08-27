import { getPostsByTag, getTagBySlug } from '$lib/data/posts.js'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
  const tag = getTagBySlug(params.slug)
  
  if (!tag) {
    throw error(404, `Tag "${params.slug}" not found`)
  }

  const posts = getPostsByTag(params.slug)

  return {
    tag,
    posts
  }
}