import { parse } from 'node-html-parser'

const localOrigin = 'http://127.0.0.1:5173'
const canonicalOrigin = 'https://www.michaldanieluk.pl'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

async function get(path: string) {
  const response = await fetch(`${localOrigin}${path}`)
  assert(response.ok, `${path} returned ${response.status}`)
  return response.text()
}

const sitemapXml = await get('/sitemap.xml')
const sitemapUrls = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
const sitemapPaths = sitemapUrls.map((url) => new URL(url).pathname)

function getSitemapLastmod(path: string) {
  const url = `${canonicalOrigin}${path}`
  const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return sitemapXml.match(
    new RegExp(`<loc>${escapedUrl}</loc>[\\s\\S]*?<lastmod\\s*>\\s*([^<]+)</lastmod`)
  )?.[1]
}

assert(sitemapUrls.length === new Set(sitemapUrls).size, 'Sitemap contains duplicate URLs')
assert(
  sitemapUrls.every((url) => url === canonicalOrigin || url.startsWith(`${canonicalOrigin}/`)),
  'Sitemap contains a non-www URL'
)

const tagArchive = parse(await get('/tags'))
const tagPaths = [
  ...new Set(
    tagArchive
      .querySelectorAll('a')
      .map((link) => link.getAttribute('href'))
      .filter((href): href is string => Boolean(href?.startsWith('/tag/')))
  )
]

const allPaths = [...new Set([...sitemapPaths, ...tagPaths])]
const pages = new Map<string, ReturnType<typeof parse>>()

for (let index = 0; index < allPaths.length; index += 12) {
  const paths = allPaths.slice(index, index + 12)
  const htmlPages = await Promise.all(paths.map((path) => get(path)))
  paths.forEach((path, pathIndex) => pages.set(path, parse(htmlPages[pathIndex])))
}

for (const [path, page] of pages) {
  const canonical = page.querySelector('link[rel="canonical"]')?.getAttribute('href')
  const ogUrl = page.querySelector('meta[property="og:url"]')?.getAttribute('content')

  assert(canonical?.startsWith(canonicalOrigin), `${path} has invalid canonical: ${canonical}`)
  assert(ogUrl?.startsWith(canonicalOrigin), `${path} has invalid og:url: ${ogUrl}`)

  const robots = page.querySelector('meta[name="robots"]')?.getAttribute('content') || ''
  if (robots.includes('noindex')) {
    assert(!sitemapPaths.includes(path), `${path} is noindex but appears in sitemap`)
  }

  if (path.startsWith('/post/')) {
    assert(page.querySelectorAll('h1').length === 1, `${path} does not have exactly one H1`)
    assert(
      !page.querySelector('title')?.text.endsWith(' - Michał Danieluk'),
      `${path} still uses the automatic author suffix`
    )
  }
}

for (const path of tagPaths) {
  const page = pages.get(path)
  assert(page, `${path} was not fetched`)
  const count = Number(page.text.match(/\b(\d+)\s+Wpis(?:y|ów)?\b/)?.[1])
  const robots = page.querySelector('meta[name="robots"]')?.getAttribute('content') || ''

  assert(Number.isFinite(count), `${path} does not expose its post count`)
  assert(
    count < 2 ? robots === 'noindex, follow' : !robots.includes('noindex'),
    `${path} has robots inconsistent with its post count (${count})`
  )
}

const home = pages.get('/')
assert(home, 'Homepage was not fetched')
const homeSchemas = home
  .querySelectorAll('script[type="application/ld+json"]')
  .map((script) => JSON.parse(script.text))
assert(
  homeSchemas.some((schema) => schema['@type'] === 'WebSite'),
  'Homepage lacks WebSite JSON-LD'
)
assert(!home.text.includes('](/post/'), 'Homepage exposes a raw Markdown link in preview text')

const about = pages.get('/about')
assert(about, 'About page was not fetched')
assert(
  home.querySelector('meta[name="description"]')?.getAttribute('content') !==
    about.querySelector('meta[name="description"]')?.getAttribute('content'),
  'Homepage and about page still share the same description'
)

for (const path of [
  '/post/nvim-i-obs',
  '/post/workflow',
  '/post/date-in-fns',
  '/post/text-email'
]) {
  const description = pages
    .get(path)
    ?.querySelector('meta[name="description"]')
    ?.getAttribute('content')
  assert(description, `${path} lacks an explicit description`)
  assert(!/[#*_`\[\]]/.test(description), `${path} description contains Markdown syntax`)
}

const article = pages.get('/post/jak-zrobic-audyt-seo_2026-07-19')
assert(article, 'Audit article was not fetched')
const articleSchemas = article
  .querySelectorAll('script[type="application/ld+json"]')
  .map((script) => JSON.parse(script.text))
assert(
  !articleSchemas.some((schema) => schema['@type'] === 'WebSite'),
  'Article duplicates homepage WebSite schema'
)
const auditBlogPosting = articleSchemas.find((schema) => schema['@type'] === 'BlogPosting')
assert(auditBlogPosting, 'Audit article lacks BlogPosting JSON-LD')
assert(
  auditBlogPosting.dateModified === auditBlogPosting.datePublished,
  'Article without updated frontmatter does not fall back to datePublished'
)
assert(
  getSitemapLastmod('/post/jak-zrobic-audyt-seo_2026-07-19')?.startsWith('2026-07-19'),
  'Sitemap fallback lastmod does not use the publication date'
)

const updatedArticle = pages.get('/post/nvim-i-obs')
assert(updatedArticle, 'Updated article was not fetched')
const updatedBlogPosting = updatedArticle
  .querySelectorAll('script[type="application/ld+json"]')
  .map((script) => JSON.parse(script.text))
  .find((schema) => schema['@type'] === 'BlogPosting')
assert(updatedBlogPosting, 'Updated article lacks BlogPosting JSON-LD')
assert(
  updatedBlogPosting.dateModified.startsWith('2026-07-22'),
  'Updated article schema does not use its updated frontmatter'
)
assert(
  getSitemapLastmod('/post/nvim-i-obs')?.startsWith('2026-07-22'),
  'Updated article sitemap lastmod does not use its updated frontmatter'
)

const postsJson = JSON.parse(await get('/api/posts.json'))
assert(
  postsJson.find((post: { slug: string }) => post.slug === 'nvim-i-obs')?.updated === '2026-07-22',
  'Posts API does not expose the normalized updated date'
)

const robotsTxt = await get('/robots.txt')
assert(
  robotsTxt.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`),
  'robots.txt lacks the canonical sitemap directive'
)
for (const agent of ['OAI-SearchBot', 'ChatGPT-User', 'Claude-SearchBot', 'Claude-User']) {
  assert(robotsTxt.includes(`User-agent: ${agent}\nAllow: /`), `robots.txt does not allow ${agent}`)
}
for (const agent of ['GPTBot', 'ClaudeBot']) {
  assert(
    robotsTxt.includes(`User-agent: ${agent}\nDisallow: /`),
    `robots.txt does not block ${agent}`
  )
}

const llmsTxt = await get('/llms.txt')
for (const requiredUrl of [
  canonicalOrigin,
  `${canonicalOrigin}/seo`,
  `${canonicalOrigin}/google-ads`,
  `${canonicalOrigin}/meta-ads`,
  `${canonicalOrigin}/marketing`,
  `${canonicalOrigin}/posts`,
  `${canonicalOrigin}/sitemap.xml`,
  `${canonicalOrigin}/rss.xml`,
  `${canonicalOrigin}/api/posts.json`
]) {
  assert(llmsTxt.includes(requiredUrl), `llms.txt lacks ${requiredUrl}`)
}

const postsArchive = parse(await get('/posts'))
const paginationPaths = [
  ...new Set(
    postsArchive
      .querySelectorAll('nav[aria-label="Strony archiwum"] a')
      .map((link) => link.getAttribute('href'))
      .filter((href): href is string => Boolean(href))
  )
]
assert(paginationPaths.length >= 4, 'Posts archive does not link directly to every page')

const oldestPage = parse(await get(paginationPaths.at(-1) || '/posts/4'))
const oldestLinks = oldestPage
  .querySelectorAll('a')
  .map((link) => link.getAttribute('href'))
  .filter(Boolean)
assert(oldestLinks.includes('/post/text-email'), 'Oldest archive page does not link text-email')
assert(oldestLinks.includes('/post/ans-dot-file'), 'Oldest archive page does not link ans-dot-file')

console.log(
  JSON.stringify(
    {
      checkedPages: pages.size,
      sitemapUrls: sitemapUrls.length,
      tagPages: tagPaths.length,
      noindexTagPages: tagPaths.filter((path) =>
        pages
          .get(path)
          ?.querySelector('meta[name="robots"]')
          ?.getAttribute('content')
          ?.includes('noindex')
      ).length,
      postPages: sitemapPaths.filter((path) => path.startsWith('/post/')).length,
      status: 'ok'
    },
    null,
    2
  )
)
