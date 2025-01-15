import { json } from '@sveltejs/kit'
import { prisma } from '@training-needs/database'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async () => {
  const feedbacks = await prisma.feedbackCategory.findMany({
    include: {
      questions: true
    }
  })

  return json(feedbacks)
}
