import { prisma, type BaseTrainingSeminar } from '@training-needs/database'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request }) => {
  const { userId, seminars } = (await request.json()) as {
    userId: string
    seminars: BaseTrainingSeminar[]
  }

  for (const seminar of seminars) {
    await prisma.baseVote.create({
      data: {
        userId,
        seminarId: seminar.id,
        cycleId: seminar.cycleId,
        value: seminar.rank
      }
    })

    const participation = await prisma.baseParticipation.findFirst({
      where: {
        userId,
        cycle: {
          active: true
        }
      }
    })

    await prisma.baseParticipation.update({
      where: {
        id: participation?.id
      },
      data: {
        didVote: true
      }
    })
  }

  return new Response(null, { status: 204, statusText: 'ok' })
}
