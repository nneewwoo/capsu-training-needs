import { json } from '@sveltejs/kit'
import { prisma } from '@training-needs/database'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async () => {
  const newCycle = await prisma.baseCycle.findFirst({
    where: {
      active: true
    }
  })

  const cycle = {
    ...newCycle,
    endDate: newCycle?.endDate
      ? new Date(newCycle.endDate.toLocaleString())
      : null
  }

  return json(cycle)
}
