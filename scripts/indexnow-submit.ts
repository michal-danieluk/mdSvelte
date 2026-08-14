// @ts-nocheck -- repo nie instaluje deklaracji Node/Bun; ten skrypt weryfikują testy runtime.
import { execFile } from 'node:child_process'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)

export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'
export const SITE_ORIGIN = 'https://www.michaldanieluk.pl'
const INDEXNOW_KEY_PATTERN = /^[A-Za-z0-9-]{8,128}$/
const MAX_URLS_PER_REQUEST = 10_000

export type ChangedFile = {
  status: string
  paths: string[]
}

export type IndexNowPayload = {
  host: string
  key: string
  keyLocation: string
  urlList: string[]
}

type FetchLike = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>

export function isValidIndexNowKey(key: string) {
  return INDEXNOW_KEY_PATTERN.test(key)
}

export async function findIndexNowKey(staticDir = path.resolve('static')) {
  const candidates: Array<{ key: string; filePath: string }> = []
  const entries = await readdir(staticDir, { withFileTypes: true })

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.txt')) continue
    const key = entry.name.slice(0, -4)
    if (!isValidIndexNowKey(key)) continue

    const filePath = path.join(staticDir, entry.name)
    const content = (await readFile(filePath, 'utf8')).trim()
    if (content === key) candidates.push({ key, filePath })
  }

  if (candidates.length !== 1) {
    throw new Error(
      `Oczekiwano dokładnie jednego poprawnego pliku klucza IndexNow, znaleziono: ${candidates.length}`
    )
  }

  return candidates[0]
}

export function normalizeSubmittedUrls(
  values: string[],
  origin = SITE_ORIGIN,
  limit = MAX_URLS_PER_REQUEST
) {
  const canonicalOrigin = new URL(origin)
  const urls = new Set<string>()

  for (const value of values) {
    const candidate = new URL(value)
    if (
      candidate.protocol !== canonicalOrigin.protocol ||
      candidate.host !== canonicalOrigin.host ||
      candidate.username ||
      candidate.password
    ) {
      throw new Error(`URL nie należy do kanonicznego hosta HTTPS: ${value}`)
    }

    candidate.hash = ''
    urls.add(candidate.toString())
  }

  if (urls.size > limit) {
    throw new Error(`IndexNow przyjmuje maksymalnie ${limit} URL-i w jednym zgłoszeniu`)
  }

  return [...urls]
}

export function createIndexNowPayload(
  key: string,
  values: string[],
  origin = SITE_ORIGIN
): IndexNowPayload {
  if (!isValidIndexNowKey(key)) throw new Error('Niepoprawny klucz IndexNow')

  const canonicalOrigin = new URL(origin)
  return {
    host: canonicalOrigin.host,
    key,
    keyLocation: `${canonicalOrigin.origin}/${key}.txt`,
    urlList: normalizeSubmittedUrls(values, canonicalOrigin.origin)
  }
}

export function parseNameStatus(output: string): ChangedFile[] {
  return output
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => {
      const [status, ...paths] = line.split('\t')
      if (!status || paths.length === 0) throw new Error(`Niepoprawny wpis git diff: ${line}`)
      return { status, paths }
    })
}

function postUrlFromPath(filePath: string, origin: string) {
  if (!filePath.startsWith('posts/') || !filePath.endsWith('.md')) return null

  const relativePath = filePath.slice('posts/'.length)
  const slug = relativePath.endsWith('/index.md')
    ? relativePath.slice(0, -'/index.md'.length)
    : relativePath.slice(0, -'.md'.length)

  return slug ? `${origin}/post/${slug}` : null
}

function requiresSitemap(filePath: string) {
  return (
    filePath.startsWith('src/') ||
    filePath === 'svelte.config.js' ||
    filePath === 'vite.config.js' ||
    filePath === 'mdsvex.config.js'
  )
}

export function selectUrlsFromChanges(
  changes: ChangedFile[],
  sitemapUrls: string[],
  origin = SITE_ORIGIN
) {
  const urls = new Set<string>()
  let includeSitemap = false

  for (const change of changes) {
    for (const filePath of change.paths) {
      const postUrl = postUrlFromPath(filePath, origin)
      if (postUrl) urls.add(postUrl)

      if (/^static\/[A-Za-z0-9-]{8,128}\.txt$/.test(filePath)) urls.add(`${origin}/`)
      if (filePath === 'static/robots.txt') urls.add(`${origin}/robots.txt`)
      if (filePath === 'static/llms.txt') urls.add(`${origin}/llms.txt`)
      if (requiresSitemap(filePath)) includeSitemap = true
    }
  }

  if (includeSitemap) {
    for (const url of sitemapUrls) urls.add(url)
  }

  return normalizeSubmittedUrls([...urls], origin)
}

function decodeXml(value: string) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'")
}

export async function fetchSitemapUrls(fetchImpl: FetchLike = fetch, origin = SITE_ORIGIN) {
  const response = await fetchImpl(`${origin}/sitemap.xml`)
  if (!response.ok) {
    throw new Error(`Nie udało się pobrać sitemapy: HTTP ${response.status}`)
  }

  const xml = await response.text()
  return normalizeSubmittedUrls(
    [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((match) => decodeXml(match[1])),
    origin
  )
}

export async function getGitChanges(from: string, to: string, cwd = process.cwd()) {
  const { stdout } = await execFileAsync(
    'git',
    ['diff', '--name-status', '--find-renames', from, to, '--'],
    { cwd }
  )
  return parseNameStatus(stdout)
}

export async function submitIndexNow(
  payload: IndexNowPayload,
  fetchImpl: FetchLike = fetch,
  endpoint = INDEXNOW_ENDPOINT
) {
  const response = await fetchImpl(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload)
  })

  if (response.status !== 200 && response.status !== 202) {
    const body = (await response.text()).trim().slice(0, 500)
    throw new Error(
      `IndexNow odrzucił zgłoszenie: HTTP ${response.status}${body ? ` — ${body}` : ''}`
    )
  }

  return { status: response.status, submitted: payload.urlList.length }
}

type CliOptions = {
  from?: string
  to?: string
  urls: string[]
  dryRun: boolean
}

function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = { urls: [], dryRun: false }

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    if (arg === '--from' || arg === '--to' || arg === '--url') {
      const value = argv[index + 1]
      if (!value || value.startsWith('--')) throw new Error(`Brak wartości dla ${arg}`)
      if (arg === '--from') options.from = value
      else if (arg === '--to') options.to = value
      else options.urls.push(value)
      index += 1
    } else if (arg === '--dry-run') {
      options.dryRun = true
    } else {
      throw new Error(`Nieznany argument: ${arg}`)
    }
  }

  return options
}

function manualUrlsFromEnvironment() {
  return (process.env.INDEXNOW_URLS || '')
    .split(/\r?\n/)
    .map((url) => url.trim())
    .filter(Boolean)
}

async function runCli() {
  const options = parseArgs(process.argv.slice(2))
  const manualUrls = [...options.urls, ...manualUrlsFromEnvironment()]
  const { key } = await findIndexNowKey()

  let urls: string[]
  if (manualUrls.length > 0) {
    urls = normalizeSubmittedUrls(manualUrls)
  } else {
    if (!options.from || !options.to) {
      throw new Error('Podaj --from i --to albo co najmniej jeden --url/INDEXNOW_URLS')
    }

    const changes = await getGitChanges(options.from, options.to)
    const needsSitemap = changes.some((change) => change.paths.some(requiresSitemap))
    const sitemapUrls = needsSitemap ? await fetchSitemapUrls() : []
    urls = selectUrlsFromChanges(changes, sitemapUrls)
  }

  if (urls.length === 0) {
    console.log('IndexNow: wdrożony commit nie zmienia publicznych URL-i — pomijam zgłoszenie.')
    return
  }

  const payload = createIndexNowPayload(key, urls)
  if (options.dryRun) {
    console.log(JSON.stringify(payload, null, 2))
    return
  }

  const result = await submitIndexNow(payload)
  console.log(`IndexNow: przyjęto ${result.submitted} URL-i (HTTP ${result.status}).`)
}

if (import.meta.main) {
  runCli().catch((error) => {
    console.error(`BŁĄD: ${error.message}`)
    process.exitCode = 1
  })
}
