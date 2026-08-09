import { execFileSync } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const apiOrigin = 'https://api.dataforseo.com'
const args = process.argv.slice(2)
const execute = args.includes('--execute')
const serpOnly = args.includes('--serp-only')

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function getArgument(name) {
  const index = args.indexOf(name)
  return index >= 0 ? args[index + 1] : undefined
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, 'utf8'))
}

function readSecret(reference) {
  assert(reference?.startsWith('op://'), `Invalid 1Password reference: ${reference}`)
  return execFileSync('op', ['read', reference], { encoding: 'utf8' }).trim()
}

function sumTaskCost(payload) {
  return (payload.tasks ?? []).reduce((total, task) => total + Number(task.cost ?? 0), 0)
}

function getRate(entries, costType) {
  const entry = entries.find((candidate) => candidate.cost_type === costType)
  assert(entry, `Missing ${costType} rate in DataForSEO user_data`)
  return Number(entry.cost)
}

async function apiRequest(endpoint, authorization, body) {
  const response = await fetch(`${apiOrigin}${endpoint}`, {
    method: body ? 'POST' : 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: authorization,
      ...(body ? { 'Content-Type': 'application/json' } : {})
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(60_000)
  })

  const payload = await response.json()
  assert(
    response.ok,
    `${endpoint} returned HTTP ${response.status}: ${payload.status_code ?? 'unknown'} ${payload.status_message ?? 'unknown error'}`
  )
  assert(
    payload.status_code === 20000,
    `${endpoint} returned ${payload.status_code}: ${payload.status_message}`
  )
  assert(payload.tasks_error === 0, `${endpoint} returned ${payload.tasks_error} task errors`)

  for (const task of payload.tasks ?? []) {
    assert(task.status_code === 20000, `${endpoint} task failed: ${task.status_message}`)
  }

  return payload
}

const configPath = getArgument('--config') ?? '.dataforseo.json'
const planPath = getArgument('--plan') ?? 'docs/DATAFORSEO_RESEARCH_PLAN.json'
const config = await readJson(configPath)
const plan = await readJson(planPath)
const login = readSecret(config.loginRef)
const password = readSecret(config.passwordRef)
const authorization = `Basic ${Buffer.from(`${login}:${password}`).toString('base64')}`

const userData = await apiRequest('/v3/appendix/user_data', authorization)
const account = userData.tasks[0].result[0]
const keywordRates = account.price.dataforseo_labs.keyword_overview.live.priority_normal
const serpRates = account.price.serp.live.advanced.priority_normal
const rates = {
  keywordRequest: getRate(keywordRates, 'per_request'),
  keywordResult: getRate(keywordRates, 'per_result'),
  serpRequest: getRate(serpRates, 'per_request')
}

const estimatedKeywordCost = serpOnly
  ? 0
  : rates.keywordRequest + rates.keywordResult * plan.keywords.length
const estimatedSerpCost = rates.serpRequest * plan.serpKeywords.length
const estimatedCost = estimatedKeywordCost + estimatedSerpCost
const maxCost = Number(getArgument('--max-cost') ?? 0)

assert(plan.keywords.length <= 700, 'Keyword Overview supports at most 700 keywords per request')
assert(plan.depth === 10, 'Only SERP depth 10 is allowed by this cost-guarded script')
assert(account.money.balance >= estimatedCost, 'DataForSEO balance is below the estimated cost')

const summary = {
  mode: execute ? 'execute' : 'dry-run',
  scope: serpOnly ? 'serp-only' : 'keywords-and-serp',
  balance: account.money.balance,
  keywordCount: plan.keywords.length,
  serpCount: plan.serpKeywords.length,
  depth: plan.depth,
  rates,
  estimatedKeywordCost,
  estimatedSerpCost,
  estimatedCost,
  maxCost: execute ? maxCost : null
}

console.log(JSON.stringify(summary, null, 2))

if (!execute) process.exit(0)

assert(Number.isFinite(maxCost) && maxCost > 0, '--execute requires --max-cost')
assert(estimatedCost <= maxCost, `Estimated cost ${estimatedCost} exceeds max cost ${maxCost}`)

const outputPath = getArgument('--out') ?? (serpOnly ? plan.serpOutput : plan.output)
const research = {
  generatedAt: new Date().toISOString(),
  plan,
  summary,
  actualCost: 0,
  status: 'running',
  keywordOverview: null,
  serps: []
}

try {
  if (!serpOnly) {
    research.keywordOverview = await apiRequest(
      '/v3/dataforseo_labs/google/keyword_overview/live',
      authorization,
      [
        {
          keywords: plan.keywords,
          location_name: plan.locationName,
          language_code: plan.languageCode,
          include_serp_info: true
        }
      ]
    )
    research.actualCost += sumTaskCost(research.keywordOverview)
  }

  for (const keyword of plan.serpKeywords) {
    const remainingEstimate = rates.serpRequest * (plan.serpKeywords.length - research.serps.length)
    assert(
      research.actualCost + remainingEstimate <= maxCost,
      'Remaining SERP requests would exceed the maximum cost'
    )

    const payload = await apiRequest('/v3/serp/google/organic/live/advanced', authorization, [
      {
        keyword,
        location_name: plan.locationName,
        language_code: plan.languageCode,
        device: 'desktop',
        depth: plan.depth
      }
    ])
    research.actualCost += sumTaskCost(payload)
    research.serps.push({ keyword, payload })
  }

  assert(research.actualCost <= maxCost, 'Actual DataForSEO cost exceeded the maximum cost')
  research.status = 'completed'
} catch (error) {
  research.status = 'failed'
  research.error = error instanceof Error ? error.message : String(error)
  throw error
} finally {
  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, `${JSON.stringify(research, null, 2)}\n`, 'utf8')
  console.log(
    JSON.stringify(
      {
        outputPath,
        status: research.status,
        actualCost: research.actualCost,
        remainingBalanceEstimate: account.money.balance - research.actualCost
      },
      null,
      2
    )
  )
}
