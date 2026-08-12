import { describe, expect, it } from 'bun:test'

import { buildBuildletterCtaEvent, pushBuildletterCtaEvent } from '../src/lib/data/analytics.js'

const destinationUrl =
  'https://buildletter.com/?utm_source=michaldanieluk.pl&utm_medium=blog_cta&utm_campaign=blog_bridge&utm_content=jak-zrobic-wizytowke-google#kontakt'

describe('Buildletter CTA analytics', () => {
  it('builds a dataLayer event without personal data', () => {
    expect(
      buildBuildletterCtaEvent({
        postSlug: 'jak-zrobic-wizytowke-google',
        ctaLocation: 'post_footer',
        destinationUrl
      })
    ).toEqual({
      event: 'click_buildletter',
      post_slug: 'jak-zrobic-wizytowke-google',
      cta_location: 'post_footer',
      destination_url: destinationUrl
    })
  })

  it('pushes exactly one event to the supplied dataLayer', () => {
    const dataLayer = []

    const event = pushBuildletterCtaEvent(dataLayer, {
      postSlug: 'jak-zrobic-wizytowke-google',
      ctaLocation: 'post_footer',
      destinationUrl
    })

    expect(dataLayer).toEqual([event])
  })

  it('uses an explicit fallback when the component has no post slug', () => {
    expect(
      buildBuildletterCtaEvent({
        postSlug: null,
        ctaLocation: 'post_footer',
        destinationUrl
      }).post_slug
    ).toBe('unknown')
  })
})
