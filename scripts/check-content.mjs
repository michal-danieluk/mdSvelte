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

const SUPPORTED_IMAGE_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.avif',
  '.gif',
  '.svg'
])
const GENERIC_IMAGE_ALTS = new Set([
  'image',
  'obraz',
  'obrazek',
  'grafika',
  'screenshot',
  'zdjęcie'
])

function validatePlaceholders(body, errors) {
  const placeholders = body.match(/\[(?:UZUPEŁNIJ|ŹRÓDŁO|INSERT[^\]]*|ADD[^\]]*)\]/giu) || []
  for (const placeholder of new Set(placeholders)) {
    errors.push(`pozostawiony placeholder: ${placeholder}`)
  }

  const citationTokens = body.match(/\bciteturn\d+[a-z]+\d+\b/giu) || []
  for (const token of new Set(citationTokens)) {
    errors.push(`wyciek technicznego tokenu cytowania: ${token}`)
  }
}

function validateHeadings(body, errors, enforceLayoutH1) {
  const proseBody = body.replace(/^(?:```|~~~)[^\n]*\n[\s\S]*?^(?:```|~~~)\s*$/gm, '')
  if (enforceLayoutH1 && /^#(?!#)\s+\S/m.test(proseBody)) {
    errors.push('nagłówek H1 w treści: layout artykułu renderuje H1 z pola title')
  }

  const seen = new Map()
  for (const match of proseBody.matchAll(/^##(?!#)\s+(.+?)\s*#*\s*$/gm)) {
    const heading = match[1].replace(/[*_`]/g, '').trim()
    const normalized = heading.toLocaleLowerCase('pl-PL')
    if (seen.has(normalized)) errors.push(`zduplikowany nagłówek H2: ${seen.get(normalized)}`)
    else seen.set(normalized, heading)
  }
}

export function resolveLocalAssetPath({ imagePath, filePath, projectRoot }) {
  let decodedPath
  try {
    decodedPath = decodeURIComponent(imagePath)
  } catch {
    throw new Error(`nieprawidłowa ścieżka lokalnego obrazu: ${imagePath}`)
  }

  const root = path.resolve(projectRoot)
  const allowedRoot = decodedPath.startsWith('/')
    ? path.resolve(root, 'static')
    : path.resolve(root, 'posts')
  const resolvedPath = decodedPath.startsWith('/')
    ? path.resolve(allowedRoot, `.${decodedPath}`)
    : path.resolve(path.dirname(path.resolve(filePath)), decodedPath)
  const relative = path.relative(allowedRoot, resolvedPath)
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error(`lokalny obraz wychodzi poza dozwolony katalog: ${imagePath}`)
  }

  if (fs.existsSync(allowedRoot)) {
    const realAllowedRoot = fs.realpathSync(allowedRoot)
    let existingPath = resolvedPath
    while (!fs.existsSync(existingPath) && existingPath !== allowedRoot) {
      existingPath = path.dirname(existingPath)
    }
    const realExistingPath = fs.realpathSync(existingPath)
    const realRelative = path.relative(realAllowedRoot, realExistingPath)
    if (realRelative.startsWith('..') || path.isAbsolute(realRelative)) {
      throw new Error(`lokalny obraz prowadzi symlinkiem poza dozwolony katalog: ${imagePath}`)
    }
  }

  return resolvedPath
}

function validateImages(body, errors, warnings, assetExists) {
  for (const match of body.matchAll(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g)) {
    const alt = match[1].trim()
    const imagePath = match[2].replace(/^<|>$/g, '')
    const cleanPath = imagePath.split(/[?#]/, 1)[0]

    if (!alt) errors.push(`pusty alt text obrazu: ${imagePath}`)
    else if (GENERIC_IMAGE_ALTS.has(alt.toLocaleLowerCase('pl-PL'))) {
      warnings.push(`generyczny alt text obrazu: „${alt}”`)
    }

    let parsedPath = cleanPath
    try {
      parsedPath = new URL(cleanPath, 'https://local.invalid').pathname
    } catch {
      // Extension validation below will report malformed or unsupported paths.
    }
    const extension = path.extname(parsedPath).toLocaleLowerCase('en-US')
    if (!SUPPORTED_IMAGE_EXTENSIONS.has(extension)) {
      errors.push(`nieobsługiwany format obrazu: ${imagePath}`)
    }

    const isRemote = /^(?:https?:|data:)/i.test(imagePath)
    if (!isRemote && assetExists) {
      try {
        if (!assetExists(cleanPath)) errors.push(`nieistniejący lokalny obraz: ${imagePath}`)
      } catch (error) {
        errors.push(error.message)
      }
    }
  }
}

export function validatePost({ filePath, source, knownSlugs, assetExists = null }) {
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

  validatePlaceholders(body, errors)
  validateHeadings(body, errors, Boolean(metadata.workflow_status))
  validateImages(body, errors, warnings, assetExists)

  const links = body.matchAll(/\]\(\/post\/([^\s)?#]+)(?:[?#][^)]*)?\)/g)
  for (const link of links) {
    let targetSlug
    try {
      targetSlug = decodeURIComponent(link[1].replace(/\/$/, ''))
    } catch {
      errors.push(`nieprawidłowo zakodowany link wewnętrzny: /post/${link[1]}`)
      continue
    }
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
  const projectRoot = process.cwd()
  const posts = getMarkdownFiles(postsDirectory).map((filePath) => ({
    filePath: path.relative(process.cwd(), filePath),
    source: fs.readFileSync(filePath, 'utf8'),
    assetExists: (imagePath) => {
      const resolvedPath = resolveLocalAssetPath({ imagePath, filePath, projectRoot })
      return fs.existsSync(resolvedPath)
    }
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
