import { prisma } from '@training-needs/database'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  const cycles = await prisma.baseCycle.findMany({
    where: {
      active: false
    }
  })

  const activeCycle = await prisma.baseCycle.findFirst({
    where: {
      active: true
    }
  })

  return {
    cycles,
    activeCycle
  }
}
