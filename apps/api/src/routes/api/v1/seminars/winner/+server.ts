import { json } from '@sveltejs/kit'
import { prisma } from '@training-needs/database'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async () => {
  const winner = await prisma.baseTrainingSeminar.findFirst({
    where: { isWinner: true, cycle: { active: true } }
  })

  if (winner) {
    return json(winner)
  }

  return new Response(null, { status: 500 })
}
