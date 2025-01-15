import { json } from '@sveltejs/kit'
import { prisma } from '@training-needs/database'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request }) => {
  const { userId } = (await request.json()) as {
    userId: string
  }

  const cycle = await prisma.baseCycle.findFirst({
    where: {
      active: true
    },
    select: {
      id: true,
      period: true
    }
  })

  const winner = await prisma.baseTrainingSeminar.findFirst({
    where: {
      isWinner: true
    },
    select: {
      questions: true
    }
  })

  if (!cycle || !winner) {
    return new Response(null, { status: 500 })
  }

  const cycleId = cycle.id
  const period = cycle.period
  const count = winner.questions.length

  let score = 0

  if (period === 1) {
    const pretestResponse = await prisma.basePretestResponse.findFirst({
      where: {
        userId,
        cycleId
      }
    })

    if (pretestResponse) {
      score = pretestResponse.score
    }
  }

  if (period === 3) {
    const posttestResponse = await prisma.basePosttestResponse.findFirst({
      where: {
        userId,
        cycleId
      }
    })

    if (posttestResponse) {
      score = posttestResponse.score
    }
  }

  return json({ score, count })
}
