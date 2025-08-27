import { getAllTags } from '$lib/data/posts.js'

export async function load() {
  return {
    tags: getAllTags()
  }
}