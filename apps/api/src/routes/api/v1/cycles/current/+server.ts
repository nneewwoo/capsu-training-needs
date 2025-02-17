import { json } from '@sveltejs/kit'
import { prisma } from '@training-needs/database'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async () => {
  const cycle = await prisma.baseCycle.findFirst({
    where: {
      active: true
    }
  })

  return json(cycle)
}
