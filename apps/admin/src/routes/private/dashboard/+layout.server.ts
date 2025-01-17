import { prisma } from '@training-needs/database'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async () => {
  const users = await prisma.user.findMany({
    where: { isAdmin: false },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const cycle = await prisma.baseCycle.findFirst({
    where: {
      active: true
    }
  })

  return {
    users,
    cycle: cycle || {
      id: '',
      period: 99,
      active: false,
      endDate: new Date(Date.now() - 1000 * 60)
    }
  }
}
