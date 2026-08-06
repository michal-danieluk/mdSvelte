import { parse } from 'node-html-parser'
import { SOCIAL_PREVIEW_REVISION } from '../src/lib/data/socialPreview'

const localOrigin = 'http://127.0.0.1:5173'
const canonicalOrigin = 'https://www.michaldanieluk.pl'
const socialPreviewOnly = process.argv.includes('--social-preview-only')

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

async function get(path: string): Promise<string> {
  const response = await fetch(`${localOrigin}${path}`, { signal: AbortSignal.timeout(30_000) })
  assert(response.ok, `${path} returned ${response.status}`)
  return response.text()
}

interface PostApiEntry {
  slug: string
  updated?: string
}

function isPostApiEntry(value: unknown): value is PostApiEntry {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as { slug?: unknown }).slug === 'string'
  )
}

function getMetaContent(page: ReturnType<typeof parse>, selector: string, path: string): string {
  const content = page.querySelector(selector)?.getAttribute('content')
  assert(content, `${path} lacks ${selector}`)
  return content
}

async function assertGeneratedPng(imageUrl: string, path: string): Promise<void> {
  const canonicalImageUrl = new URL(imageUrl)
  const localImageUrl = `${localOrigin}${canonicalImageUrl.pathname}${canonicalImageUrl.search}`
  const response = await fetch(localImageUrl, { signal: AbortSignal.timeout(30_000) })

  assert(response.ok, `${path} social image returned ${response.status}`)
  assert(
    response.headers.get('content-type')?.split(';')[0] === 'image/png',
    `${path} social image is not image/png`
  )

  const bytes = new Uint8Array(await response.arrayBuffer())
  assert(bytes.byteLength > 10 * 1024, `${path} social image is not larger than 10KB`)
  assert(
    bytes.length >= 24 &&
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47 &&
      new TextDecoder().decode(bytes.subarray(12, 16)) === 'IHDR',
    `${path} social image lacks a valid PNG IHDR`
  )

  const dimensions = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  assert(dimensions.getUint32(16) === 1200, `${path} social image width is not 1200`)
  assert(dimensions.getUint32(20) === 630, `${path} social image height is not 630`)
}

const sitemapXml = await get('/sitemap.xml')
const sitemapUrls = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
const sitemapPaths = sitemapUrls.map((url) => new URL(url).pathname)
const postsJson: unknown = JSON.parse(await get('/api/posts.json'))
assert(Array.isArray(postsJson), 'Posts API did not return an array')
assert(postsJson.every(isPostApiEntry), 'Posts API returned an invalid post entry')
const postPaths = postsJson.map((post) => `/post/${post.slug}`)
const sitemapPostPaths = sitemapPaths.filter((path) => path.startsWith('/post/'))

assert(postPaths.length === new Set(postPaths).size, 'Posts API contains duplicate slugs')
assert(
  postPaths.length === sitemapPostPaths.length &&
    postPaths.every((path) => sitemapPostPaths.includes(path)),
  'Sitemap post routes do not exactly match every Posts API route'
)

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

const allPaths = [...new Set([...sitemapPaths, ...postPaths, ...tagPaths])]
const pages = new Map<string, ReturnType<typeof parse>>()

for (let index = 0; index < allPaths.length; index += 12) {
  const paths = allPaths.slice(index, index + 12)
  const htmlPages = await Promise.all(paths.map((path) => get(path)))
  paths.forEach((path, pathIndex) => pages.set(path, parse(htmlPages[pathIndex])))
}

async function verifyPostSocialPreview(path: string): Promise<void> {
  const page = pages.get(path)
  assert(page, `${path} was not fetched`)

  const canonical = page.querySelector('link[rel="canonical"]')?.getAttribute('href')
  assert(canonical, `${path} lacks canonical link`)
  const ogUrl = getMetaContent(page, 'meta[property="og:url"]', path)
  assert(canonical === `${canonicalOrigin}${path}`, `${path} canonical is not query-free`)
  assert(ogUrl === canonical, `${path} og:url does not exactly match canonical`)

  const ogImageTags = page.querySelectorAll('meta[property="og:image"]')
  assert(ogImageTags.length === 1, `${path} does not have exactly one og:image`)
  const ogImage = getMetaContent(page, 'meta[property="og:image"]', path)
  const parsedOgImage = new URL(ogImage)
  assert(parsedOgImage.protocol === 'https:', `${path} og:image is not absolute HTTPS`)
  assert(parsedOgImage.origin === canonicalOrigin, `${path} og:image is not on canonical origin`)
  assert(
    parsedOgImage.searchParams.get('v') === SOCIAL_PREVIEW_REVISION,
    `${path} og:image lacks the current social revision`
  )
  assert(
    getMetaContent(page, 'meta[property="og:image:secure_url"]', path) === ogImage,
    `${path} og:image:secure_url does not match og:image`
  )
  assert(
    getMetaContent(page, 'meta[property="og:image:type"]', path) === 'image/png',
    `${path} og:image:type is not image/png`
  )
  assert(
    getMetaContent(page, 'meta[property="og:image:width"]', path) === '1200',
    `${path} og:image:width is not 1200`
  )
  assert(
    getMetaContent(page, 'meta[property="og:image:height"]', path) === '630',
    `${path} og:image:height is not 630`
  )
  const ogImageAlt = getMetaContent(page, 'meta[property="og:image:alt"]', path)
  assert(
    getMetaContent(page, 'meta[name="twitter:card"]', path) === 'summary_large_image',
    `${path} twitter:card is not summary_large_image`
  )
  assert(
    getMetaContent(page, 'meta[name="twitter:image"]', path) === ogImage,
    `${path} twitter:image does not match og:image`
  )
  const twitterImageAlt = getMetaContent(page, 'meta[name="twitter:image:alt"]', path)

  const blogPosting = page
    .querySelectorAll('script[type="application/ld+json"]')
    .map((script) => JSON.parse(script.text))
    .find((schema) => schema['@type'] === 'BlogPosting')
  assert(blogPosting, `${path} lacks BlogPosting JSON-LD`)
  assert(typeof blogPosting.headline === 'string', `${path} BlogPosting lacks a headline`)
  assert(
    parsedOgImage.searchParams.get('title') === blogPosting.headline,
    `${path} og:image title does not match BlogPosting headline`
  )
  assert(ogImageAlt.includes(blogPosting.headline), `${path} og:image:alt is not title-based`)
  assert(
    twitterImageAlt.includes(blogPosting.headline),
    `${path} twitter:image:alt is not title-based`
  )
  assert(blogPosting.image === ogImage, `${path} BlogPosting.image does not match og:image`)

  const expectedShareUrl = `${canonical}?v=${encodeURIComponent(SOCIAL_PREVIEW_REVISION)}`
  const shareAnchors = page.querySelectorAll('a[data-share-url]')
  assert(shareAnchors.length === 2, `${path} does not expose both social share links`)
  for (const link of shareAnchors) {
    assert(link.getAttribute('data-share-url') === expectedShareUrl, `${path} has stale share URL`)
    const href = link.getAttribute('href')
    assert(href, `${path} share link lacks href`)
    assert(
      new URL(href).searchParams.get('url') === expectedShareUrl,
      `${path} share href is stale`
    )
  }
  assert(
    page.querySelector('button[data-share-url]')?.getAttribute('data-share-url') ===
      expectedShareUrl,
    `${path} Copy Link URL is stale`
  )

  await assertGeneratedPng(ogImage, path)
}

for (let index = 0; index < postPaths.length; index += 4) {
  await Promise.all(postPaths.slice(index, index + 4).map(verifyPostSocialPreview))
}

console.log(
  JSON.stringify(
    {
      socialPreviewSweep: 'ok',
      postPages: postPaths.length,
      socialImages: postPaths.length,
      revision: SOCIAL_PREVIEW_REVISION
    },
    null,
    2
  )
)

if (socialPreviewOnly) process.exit(0)

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

assert(
  postsJson.find((post) => post.slug === 'nvim-i-obs')?.updated === '2026-07-22',
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
      postPages: postPaths.length,
      socialImages: postPaths.length,
      status: 'ok'
    },
    null,
    2
  )
)
