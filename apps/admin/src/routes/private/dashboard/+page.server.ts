import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ parent }) => {
  const { cycle } = await parent()

  switch (cycle?.period) {
    case 0:
      redirect(302, '/private/dashboard/voting')
      break
    case 1:
      redirect(302, '/private/dashboard/pre-test')
      break
    case 2:
      redirect(302, '/private/dashboard/seminar-ongoing')
      break
    case 3:
      redirect(302, '/private/dashboard/post-test')
      break
    case 4:
      redirect(302, '/private/dashboard/evaluation')
      break
    default:
  }
  return {}
}
