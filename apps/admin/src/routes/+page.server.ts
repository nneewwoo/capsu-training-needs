import { redirect } from '@sveltejs/kit'
import { prisma } from '@training-needs/database'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals: { user } }) => {
  if (user) {
    const prismaUser = await prisma.user.findUnique({
      where: {
        email: user.email
      }
    })

    if (prismaUser && !prismaUser.isAdmin) {
      redirect(308, `${import.meta.env.VITE_MAIN_DOMAIN_URL}`)
    } else {
      redirect(308, '/private/dashboard')
    }
  }
  return {}
}
