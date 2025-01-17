import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ parent }) => {
  const { courses } = await parent()

  if (courses) {
    redirect(302, `/private/training-seminars/${courses[0].id}`)
  }
}
