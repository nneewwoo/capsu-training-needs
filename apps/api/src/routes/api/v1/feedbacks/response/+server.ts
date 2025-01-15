import { prisma, type BaseFeedbackResponse } from '@training-needs/database'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request }) => {
  const responses = (await request.json()) as BaseFeedbackResponse[]

  for (const response of responses) {
    await prisma.baseFeedbackResponse.create({
      data: response
    })
  }

  return new Response(null, { status: 204 })
}
