import { isPillarSlug } from '$lib/data/pillars'
import type { ParamMatcher } from '@sveltejs/kit'

export const match: ParamMatcher = (param): boolean => isPillarSlug(param)
