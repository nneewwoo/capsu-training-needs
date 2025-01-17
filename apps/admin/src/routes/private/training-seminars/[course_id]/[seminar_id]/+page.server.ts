import { error } from '@sveltejs/kit'
import { prisma } from '@training-needs/database'
import type { Actions, PageServerLoad } from './$types'
import { shuffle } from '$lib/utils'

export const load: PageServerLoad = async ({ params }) => {
  const { seminar_id } = params

  const seminar = await prisma.trainingSeminar.findUnique({
    where: {
      id: seminar_id
    },
    include: {
      questions: {
        include: {
          options: true
        }
      }
    }
  })

  if (!seminar) {
    throw error(404, 'Seminar not found')
  }

  return { seminar }
}

export const actions: Actions = {
  'new-question': async ({ request, params }) => {
    const form = await request.formData()

    const { seminar_id } = params

    const question = form.get('question') as string
    const option1 = form.get('option1') as string
    const option2 = form.get('option2') as string
    const option3 = form.get('option3') as string

    if (!question || !option1 || !option2 || !option3) {
      return {
        status: 403,
        error: 'Please fill out all required fields'
      }
    }

    const newQuestion = await prisma.trainingSeminarQuestion.create({
      data: {
        text: question,
        seminarId: seminar_id
      }
    })

    const newOptions = shuffle([
      {
        label: option1,
        isCorrect: true
      },
      {
        label: option2,
        isCorrect: false
      },
      {
        label: option3,
        isCorrect: false
      }
    ])

    for (const option of newOptions) {
      await prisma.trainingSeminarQuestionOption.create({
        data: {
          ...option,
          questionId: newQuestion.id
        }
      })
    }

    return {
      message: 'New question added successfully'
    }
  }
}
