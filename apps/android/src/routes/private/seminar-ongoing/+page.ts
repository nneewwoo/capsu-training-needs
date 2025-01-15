import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ parent }) => {
  const { participation } = await parent()

  if (!participation.didPretest) {
    throw error(403, {
      message:
        'Looks like you missed the pre-test pit stop! No entry to the seminar without it. Next time, buckle up for the quiz adventure first!'
    })
  }
}
