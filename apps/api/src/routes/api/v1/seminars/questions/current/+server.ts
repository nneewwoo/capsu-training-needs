import { json } from '@sveltejs/kit'
import { prisma } from '@training-needs/database'
import type { RequestHandler } from './$types'
import { shuffle } from '$lib/utils'

export const GET: RequestHandler = async () => {
  const winner = await prisma.baseTrainingSeminar.findFirst({
    where: { isWinner: true, cycle: { active: true } }
  })

  if (winner) {
    const questions = await prisma.baseTrainingSeminarQuestion.findMany({
      where: {
        seminarId: winner.id
      },
      include: {
        options: true
      }
    })

    return json(shuffle(questions))
  }

  return new Response(null, { status: 500 })
}
