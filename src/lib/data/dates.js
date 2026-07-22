import { format } from 'date-fns'

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
