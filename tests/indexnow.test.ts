// @ts-nocheck -- repo nie instaluje deklaracji Node/Bun; ten plik jest wykonywany przez Bun.
import { afterEach, describe, expect, test } from 'bun:test'
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

import {
  SITE_ORIGIN,
  createIndexNowPayload,
  findIndexNowKey,
  isValidIndexNowKey,
  normalizeSubmittedUrls,
  parseNameStatus,
  selectUrlsFromChanges,
  submitIndexNow
} from '../scripts/indexnow-submit'

const temporaryDirectories: string[] = []

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true }))
  )
})

describe('IndexNow ownership key', () => {
  test('accepts protocol-compatible keys and rejects invalid ones', () => {
    expect(isValidIndexNowKey('a7f6d54e')).toBe(true)
    expect(isValidIndexNowKey('abc-DEF-123')).toBe(true)
    expect(isValidIndexNowKey('short')).toBe(false)
    expect(isValidIndexNowKey('invalid_key')).toBe(false)
  })

  test('finds exactly one root key whose filename equals its content', async () => {
    const directory = await mkdtemp(path.join(tmpdir(), 'indexnow-key-'))
    temporaryDirectories.push(directory)
    await mkdir(directory, { recursive: true })
    await writeFile(path.join(directory, 'abc-DEF-123.txt'), 'abc-DEF-123\n')
    await writeFile(path.join(directory, 'llms.txt'), 'not a key')

    await expect(findIndexNowKey(directory)).resolves.toMatchObject({ key: 'abc-DEF-123' })
  })

  test('the repository contains one valid IndexNow key file', async () => {
    const result = await findIndexNowKey(path.resolve('static'))
    expect(result.key).toHaveLength(64)
  })

  test('keeps ownership keys in static instead of the repository root', async () => {
    const rootKeys = (await readdir(path.resolve()))
      .filter((name) => name.endsWith('.txt'))
      .filter((name) => isValidIndexNowKey(name.slice(0, -4)))

    expect(rootKeys).toEqual([])
  })
})

describe('IndexNow payload', () => {
  test('uses the canonical host and key location while deduplicating URLs', () => {
    const payload = createIndexNowPayload('abc-DEF-123', [
      `${SITE_ORIGIN}/post/test`,
      `${SITE_ORIGIN}/post/test#section`
    ])

    expect(payload).toEqual({
      host: 'www.michaldanieluk.pl',
      key: 'abc-DEF-123',
      keyLocation: `${SITE_ORIGIN}/abc-DEF-123.txt`,
      urlList: [`${SITE_ORIGIN}/post/test`]
    })
  })

  test('rejects URLs outside the canonical HTTPS host', () => {
    expect(() => normalizeSubmittedUrls(['https://michaldanieluk.pl/post/test'])).toThrow(
      'kanonicznego hosta HTTPS'
    )
    expect(() => normalizeSubmittedUrls(['http://www.michaldanieluk.pl/post/test'])).toThrow(
      'kanonicznego hosta HTTPS'
    )
  })
})

describe('changed URL selection', () => {
  test('maps added, modified, deleted and renamed posts to their public URLs', () => {
    const changes = parseNameStatus(
      [
        'A\tposts/new-post.md',
        'M\tposts/existing/index.md',
        'D\tposts/removed.md',
        'R100\tposts/old.md\tposts/new.md',
        'M\ttests/content.test.ts'
      ].join('\n')
    )

    expect(selectUrlsFromChanges(changes, [])).toEqual([
      `${SITE_ORIGIN}/post/new-post`,
      `${SITE_ORIGIN}/post/existing`,
      `${SITE_ORIGIN}/post/removed`,
      `${SITE_ORIGIN}/post/old`,
      `${SITE_ORIGIN}/post/new`
    ])
  })

  test('expands shared source changes to current sitemap URLs', () => {
    const sitemapUrls = [`${SITE_ORIGIN}/`, `${SITE_ORIGIN}/about`]
    const changes = parseNameStatus('M\tsrc/lib/data/posts.js')
    expect(selectUrlsFromChanges(changes, sitemapUrls)).toEqual(sitemapUrls)
  })

  test('ignores changes limited to tests, docs and workflow code', () => {
    const changes = parseNameStatus(
      [
        'M\ttests/indexnow.test.ts',
        'M\tdocs/INDEXNOW.md',
        'M\t.github/workflows/indexnow.yml'
      ].join('\n')
    )
    expect(selectUrlsFromChanges(changes, [])).toEqual([])
  })

  test('submits the homepage when the public ownership key changes', () => {
    const changes = parseNameStatus('A\tstatic/abc-DEF-123.txt')
    expect(selectUrlsFromChanges(changes, [])).toEqual([`${SITE_ORIGIN}/`])
  })
})

describe('IndexNow response handling', () => {
  const payload = createIndexNowPayload('abc-DEF-123', [`${SITE_ORIGIN}/post/test`])

  test('accepts HTTP 200 and 202 responses', async () => {
    const ok = await submitIndexNow(payload, async () => new Response(null, { status: 200 }))
    const pending = await submitIndexNow(payload, async () => new Response(null, { status: 202 }))
    expect(ok).toEqual({ status: 200, submitted: 1 })
    expect(pending).toEqual({ status: 202, submitted: 1 })
  })

  test('fails on rejected submissions', async () => {
    await expect(
      submitIndexNow(payload, async () => new Response('invalid key', { status: 403 }))
    ).rejects.toThrow('HTTP 403')
  })
})

describe('production deployment workflow', () => {
  test('waits for a successful Production deployment and checks out its exact SHA', async () => {
    const workflow = await readFile(path.resolve('.github/workflows/indexnow.yml'), 'utf8')

    expect(workflow).toContain('deployment_status:')
    expect(workflow).toContain("github.event.deployment_status.state == 'success'")
    expect(workflow).toContain("github.event.deployment.environment == 'Production'")
    expect(workflow).toContain('github.event.deployment.sha')
    expect(workflow).toContain('fetch-depth: 2')
    expect(workflow).not.toContain('push:')
  })
})
