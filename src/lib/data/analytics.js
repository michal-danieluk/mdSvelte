export function buildBuildletterCtaEvent({ postSlug, ctaLocation, destinationUrl }) {
  return {
    event: 'click_buildletter',
    post_slug: postSlug || 'unknown',
    cta_location: ctaLocation,
    destination_url: destinationUrl
  }
}

export function pushBuildletterCtaEvent(dataLayer, details) {
  const event = buildBuildletterCtaEvent(details)
  dataLayer.push(event)
  return event
}
