import { error } from '@sveltejs/kit'
import { posts } from '$lib/data/posts'
import { getPillar, getPillarArticleSlugs, isPillarSlug, pillarSlugs } from '$lib/data/pillars'
import type { EntryGenerator, PageServerLoad } from './$types'

type SourcePost = {
  slug: string
  title: string
  description?: string
  date?: string
  readingTime?: string
  tags?: string[]
  preview: { text: string }
}

export const prerender = true

export const entries: EntryGenerator = () => pillarSlugs.map((pillar) => ({ pillar }))

export const load: PageServerLoad = ({ params }) => {
  if (!isPillarSlug(params.pillar)) {
    error(404, 'Nie znaleziono przewodnika')
  }

  const pillar = getPillar(params.pillar)
  const postsBySlug = new Map((posts as SourcePost[]).map((post) => [post.slug, post]))
  const articles = getPillarArticleSlugs(pillar).map((slug) => {
    const post = postsBySlug.get(slug)

    if (!post) {
      error(500, `Brakuje wpisu przypisanego do przewodnika: ${slug}`)
    }

    return {
      slug: post.slug,
      title: post.title,
      description: post.description ?? post.preview.text,
      date: post.date,
      readingTime: post.readingTime,
      tags: post.tags ?? []
    }
  })

  return { pillar, articles }
}
