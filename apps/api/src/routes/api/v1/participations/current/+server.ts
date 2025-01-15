import { json } from '@sveltejs/kit'
import { prisma } from '@training-needs/database'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request }) => {
  const { userId } = await request.json()

  const participation = await prisma.baseParticipation.findFirst({
    where: {
      cycle: {
        active: true
      },
      userId
    }
  })

  return json(participation)
}
