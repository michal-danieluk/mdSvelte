export function buildJsonLdScript(json) {
  const safeJson = json.replaceAll('<', '\\u003c')
  return `<script type="application/ld+json">${safeJson}</script>`
}
