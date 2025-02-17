import { prisma } from '@training-needs/database'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async () => {
  const users = await prisma.user.findMany({
    where: { isAdmin: false },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const activeCycle = await prisma.baseCycle.findFirst({
    where: {
      active: true
    }
  })

  const endDate = new Date(
    new Date(activeCycle?.endDate || Date.now()).toLocaleString()
  )

  const cycle = { ...activeCycle, endDate }

  console.log(cycle)

  return {
    users,
    cycle: activeCycle ? cycle : null
  }
}
