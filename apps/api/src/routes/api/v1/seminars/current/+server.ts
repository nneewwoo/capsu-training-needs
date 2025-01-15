import { json } from '@sveltejs/kit'
import { prisma } from '@training-needs/database'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async () => {
  const seminars = await prisma.baseTrainingSeminar.findMany({
    where: {
      cycle: {
        active: true
      }
    }
  })

  return json(seminars)
}
