import { error } from '@sveltejs/kit'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({ parent }) => {
  const { cycle, participation } = await parent()

  if (cycle.period === 1) {
    if (!participation.didVote) {
      throw error(
        403,
        'You skipped the voting step. No vote, no pre-test! Don’t forget to have your say next time — it’s your chance to steer the ship!'
      )
    }
  }

  if (cycle.period === 3) {
    if (!participation.didAttend) {
      throw error(403, {
        message:
          'You missed the main event. Without attending the seminar, there’s no backstage access to the post-test. See you in the next session!'
      })
    }
  }
}
