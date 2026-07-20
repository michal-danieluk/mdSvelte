// This is an endpoint that generates a basic sitemap for the index page and all posts.
// It's helpful for SEO but does require you to keep it updated to reflect the routes of your website.
// It is OK to delete this file if you'd rather not bother with it.

import { posts, getAllTags } from '$lib/data/posts'
import { pillarSlugs } from '$lib/data/pillars'
import { website } from '$lib/info'

export const prerender = true

// make sure this matches your post route
const getPostUrl = (slug) => `${website}/post/${slug}`
const getTagUrl = (slug) => `${website}/tag/${slug}`

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET({ setHeaders }) {
  setHeaders({
    'Cache-Control': `max-age=0, s-max-age=600`,
    'Content-Type': 'application/xml'
  })

  const tags = getAllTags()

  const staticUrls = [
    { loc: website, priority: '1.0', changefreq: 'weekly' },
    { loc: `${website}/posts`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${website}/about`, priority: '0.5', changefreq: 'monthly' },
    { loc: `${website}/tags`, priority: '0.4', changefreq: 'monthly' },
    ...pillarSlugs.map((slug) => ({
      loc: `${website}/${slug}`,
      priority: '0.8',
      changefreq: 'weekly'
    }))
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
      xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
      xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:pagemap="http://www.google.com/schemas/sitemap-pagemap/1.0"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
    >
      ${staticUrls
        .map(
          (page) => `<url>
            <loc>${page.loc}</loc>
            <changefreq>${page.changefreq}</changefreq>
            <priority>${page.priority}</priority>
          </url>`
        )
        .join('')}

      ${posts
        .map(
          (post) => `<url>
            <loc>${getPostUrl(post.slug)}</loc>
            <lastmod
              >${
                post.updated
                  ? new Date(post.updated).toISOString()
                  : new Date(post.date).toISOString()
              }</lastmod
            >
            <changefreq>monthly</changefreq>
            <priority>0.9</priority>
          </url>`
        )
        .join('')}

      ${tags
        .map(
          (tag) => `<url>
            <loc>${getTagUrl(tag.slug)}</loc>
            <changefreq>monthly</changefreq>
            <priority>0.3</priority>
          </url>`
        )
        .join('')}
    </urlset>`

  return new Response(xml)
}
