import { describe, expect, it } from 'bun:test'
import { buildJsonLdScript } from '../src/lib/data/jsonLd.js'

describe('JSON-LD script rendering', () => {
  it('escapes markup inside JSON while keeping one script wrapper', () => {
    const json = JSON.stringify({ headline: '</script><script>alert(1)</script>' })

    const result = buildJsonLdScript(json)

    expect(result).toStartWith('<script type="application/ld+json">')
    expect(result).toEndWith('</script>')
    expect(result.match(/<\/script>/g)).toHaveLength(1)
    expect(result).toContain('\\u003c/script>\\u003cscript>alert(1)\\u003c/script>')
  })
})
