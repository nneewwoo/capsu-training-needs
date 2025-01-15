import { error, redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ parent }) => {
  const { cycle } = await parent()
  if (cycle) {
    switch (cycle.period) {
      case 0:
        {
          redirect(308, '/private/voting')
        }
        break
      case 1:
      case 3:
        {
          redirect(308, '/private/test')
        }
        break
      case 2:
        {
          redirect(308, '/private/seminar-ongoing')
        }
        break
      case 4:
        {
          redirect(308, '/private/feedback')
        }
        break
      default: {
        throw error(500, 'An unknown error occured.')
      }
    }
  }
  redirect(308, '/private/idle')
}
