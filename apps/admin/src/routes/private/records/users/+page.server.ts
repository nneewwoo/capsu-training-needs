import { prisma } from '@training-needs/database'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  const users = await prisma.user.findMany({
    where: {
      isAdmin: false
    }
  })

  return {
    users
  }
}
