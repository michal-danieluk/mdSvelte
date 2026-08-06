import { website } from '../info.js'

export const SOCIAL_PREVIEW_REVISION = '2026-08-06'

function requireAbsoluteHttpsUrl(value: string, label: string): URL {
  const url = new URL(value)

  if (url.protocol !== 'https:') {
    throw new Error(`${label} must use HTTPS: ${value}`)
  }

  return url
}

export function buildSocialPreviewImageUrl(title: string, origin = website): string {
  const imageUrl = requireAbsoluteHttpsUrl(
    new URL('/api/og', origin).toString(),
    'Social image URL'
  )
  imageUrl.search = `title=${encodeURIComponent(title)}&v=${encodeURIComponent(SOCIAL_PREVIEW_REVISION)}`
  return imageUrl.toString()
}

export function buildShareUrl(canonicalUrl: string): string {
  const shareUrl = requireAbsoluteHttpsUrl(canonicalUrl, 'Share URL')
  shareUrl.search = ''
  shareUrl.hash = ''
  shareUrl.searchParams.set('v', SOCIAL_PREVIEW_REVISION)
  return shareUrl.toString()
}
