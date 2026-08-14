import { format } from 'date-fns'

export const BLOG_TIME_ZONE = 'Europe/Warsaw'

/**
 * Returns a calendar date in the requested IANA time zone.
 *
 * @param {Date} date
 * @param {string} timeZone
 * @returns {string}
 */
export function getCalendarDate(date, timeZone) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
    .formatToParts(date)
    .reduce((result, part) => ({ ...result, [part.type]: part.value }), {})

  return `${parts.year}-${parts.month}-${parts.day}`
}

/**
 * Normalizes frontmatter dates without shifting date-only values across time zones.
 *
 * @param {string | number | Date | undefined | null} value
 * @returns {string | undefined}
 */
export function normalizePostDate(value) {
  if (value === undefined || value === null || value === '') return undefined

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    throw new TypeError(`Invalid post date: ${String(value)}`)
  }

  const offsetInMilliseconds = date.getTimezoneOffset() * 60 * 1000
  return format(new Date(date.getTime() + offsetInMilliseconds), 'yyyy-MM-dd')
}
