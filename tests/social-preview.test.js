import { describe, expect, it } from 'bun:test'
import {
  buildShareUrl,
  buildSocialPreviewImageUrl,
  SOCIAL_PREVIEW_REVISION
} from '../src/lib/data/socialPreview'

describe('social preview URL helpers', () => {
  it('uses one revision for generated images and cache-busted share URLs', () => {
    const imageUrl = new URL(buildSocialPreviewImageUrl('Przykładowy wpis'))
    const shareUrl = new URL(buildShareUrl('https://www.michaldanieluk.pl/post/przyklad'))

    expect(imageUrl.searchParams.get('v')).toBe(SOCIAL_PREVIEW_REVISION)
    expect(shareUrl.searchParams.get('v')).toBe(SOCIAL_PREVIEW_REVISION)
  })

  it('preserves Polish characters, an em dash, and a dollar sign in the encoded title', () => {
    const title = 'Automatyzacja dla małej firmy — mój stack za $0'
    const imageUrl = buildSocialPreviewImageUrl(title)

    expect(imageUrl).toContain(`title=${encodeURIComponent(title)}`)
    expect(new URL(imageUrl).searchParams.get('title')).toBe(title)
    expect(imageUrl).toStartWith('https://')
  })

  it('removes stale query and fragment data before adding the share revision', () => {
    const shareUrl = new URL(
      buildShareUrl('https://www.michaldanieluk.pl/post/przyklad?stale=1#fragment')
    )

    expect(shareUrl.origin + shareUrl.pathname).toBe('https://www.michaldanieluk.pl/post/przyklad')
    expect([...shareUrl.searchParams.entries()]).toEqual([['v', SOCIAL_PREVIEW_REVISION]])
    expect(shareUrl.hash).toBe('')
  })

  it('rejects non-HTTPS image origins and share URLs', () => {
    expect(() => buildSocialPreviewImageUrl('Tytuł', 'http://example.com')).toThrow('HTTPS')
    expect(() => buildShareUrl('http://example.com/post/test')).toThrow('HTTPS')
  })
})
