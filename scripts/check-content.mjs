import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

function parseValue(rawValue) {
  const value = rawValue.trim()

  if (!value) return ''
  if (value === 'true') return true
  if (value === 'false') return false

  if (value.startsWith('[') && value.endsWith(']')) {
    const entries = value.slice(1, -1).match(/(['"])(.*?)\1|([^,]+)/g) || []
    return entries.map((entry) => entry.trim().replace(/^(['"])(.*)\1$/, '$2'))
  }

  return value.replace(/^(['"])([\s\S]*)\1$/, '$2')
}

export function parseFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
  if (!match) throw new Error('brak lub nieprawidłowy frontmatter')

  const metadata = {}
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/)
    if (field) metadata[field[1]] = parseValue(field[2])
  }

  return {
    metadata,
    body: source.slice(match[0].length)
  }
}

export function slugFromPath(filePath) {
  const parsed = path.parse(filePath)
  return parsed.name === 'index' ? path.basename(parsed.dir) : parsed.name
}

function isValidDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{1,2}-\d{1,2}$/.test(value)) return false

  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  return (
    date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
  )
}

export function validatePost({ filePath, source, knownSlugs }) {
  const errors = []
  const warnings = []
  let metadata
  let body

  try {
    ;({ metadata, body } = parseFrontmatter(source))
  } catch (error) {
    return { errors: [error.message], warnings }
  }

  if (!metadata.title) errors.push('brak pola title')
  if (!metadata.date) errors.push('brak pola date')
  else if (!isValidDate(metadata.date)) errors.push(`nieprawidłowa data: ${metadata.date}`)

  if (!Array.isArray(metadata.tags) || metadata.tags.length === 0) warnings.push('brak tagów')

  const description = typeof metadata.description === 'string' ? metadata.description.trim() : ''
  if (!description) warnings.push('brak meta description')
  else if (description.length < 120 || description.length > 160) {
    warnings.push(`meta description ma ${description.length} znaków; zalecane 120–160`)
  }

  const effectiveTitle = String(metadata.seoTitle || metadata.title || '').trim()
  if (effectiveTitle && (effectiveTitle.length < 30 || effectiveTitle.length > 60)) {
    warnings.push(`title SEO ma ${effectiveTitle.length} znaków; zalecane 30–60`)
  }

  const links = body.matchAll(/\]\(\/post\/([^\s)?#]+)(?:[?#][^)]*)?\)/g)
  for (const link of links) {
    const targetSlug = decodeURIComponent(link[1].replace(/\/$/, ''))
    if (!knownSlugs.has(targetSlug)) {
      errors.push(`nieistniejący link wewnętrzny: /post/${targetSlug}`)
    }
  }

  return { errors, warnings, metadata, slug: slugFromPath(filePath) }
}

export function validateCollection(posts) {
  const knownSlugs = new Set(posts.map(({ filePath }) => slugFromPath(filePath)))
  const errors = []
  const warnings = []
  const titles = new Map()
  const routes = new Map()

  for (const post of posts) {
    const slug = slugFromPath(post.filePath)
    const routeFiles = routes.get(slug) || []
    routeFiles.push(post.filePath)
    routes.set(slug, routeFiles)

    const result = validatePost({ ...post, knownSlugs })
    errors.push(...result.errors.map((message) => `${post.filePath}: ${message}`))
    warnings.push(...result.warnings.map((message) => `${post.filePath}: ${message}`))

    if (result.metadata) {
      const effectiveTitle = String(result.metadata.seoTitle || result.metadata.title || '').trim()
      if (effectiveTitle) {
        const files = titles.get(effectiveTitle) || []
        files.push(post.filePath)
        titles.set(effectiveTitle, files)
      }
    }
  }

  for (const [title, files] of titles) {
    if (files.length > 1) {
      errors.push(`zduplikowany title SEO „${title}”: ${files.join(', ')}`)
    }
  }

  for (const [slug, files] of routes) {
    if (files.length > 1) {
      errors.push(`zduplikowana trasa /post/${slug}: ${files.join(', ')}`)
    }
  }

  return { errors, warnings }
}

function getMarkdownFiles(directory) {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const entryPath = path.join(directory, entry.name)
      return entry.isDirectory() ? getMarkdownFiles(entryPath) : entryPath
    })
    .filter((filePath) => filePath.endsWith('.md'))
    .sort()
}

function run() {
  const postsDirectory = path.resolve('posts')
  const posts = getMarkdownFiles(postsDirectory).map((filePath) => ({
    filePath: path.relative(process.cwd(), filePath),
    source: fs.readFileSync(filePath, 'utf8')
  }))
  const result = validateCollection(posts)

  for (const warning of result.warnings) console.warn(`WARN  ${warning}`)
  for (const error of result.errors) console.error(`ERROR ${error}`)

  console.log(
    `Content check: ${posts.length} wpisów, ${result.errors.length} błędów, ${result.warnings.length} ostrzeżeń.`
  )

  if (result.errors.length > 0) process.exitCode = 1
}

const currentFile = fileURLToPath(import.meta.url)
if (process.argv[1] && path.resolve(process.argv[1]) === currentFile) run()
