import {
  prisma,
  type BaseTrainingSeminarQuestion,
  type BaseTrainingSeminarQuestionOption
} from '@training-needs/database'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request }) => {
  interface Answer {
    id: BaseTrainingSeminarQuestion['id']
    text: BaseTrainingSeminarQuestion['text']
    options: BaseTrainingSeminarQuestionOption[]
    choice: BaseTrainingSeminarQuestionOption['id']
  }

  const { userId, answers, cycleId, period } = (await request.json()) as {
    userId: string
    answers: Answer[]
    cycleId: string
    period: number
  }

  const score = answers.reduce((sum, answer) => {
    return (
      sum +
      (answer.options.find((option) => option.id === answer.choice)?.isCorrect
        ? 1
        : 0)
    )
  }, 0)

  if (period === 1) {
    await prisma.basePretestResponse.create({
      data: {
        userId,
        score,
        cycleId
      }
    })
  }
  if (period === 3) {
    await prisma.basePosttestResponse.create({
      data: {
        userId,
        score,
        cycleId
      }
    })
  }

  return new Response(null, { status: 200 })
}
