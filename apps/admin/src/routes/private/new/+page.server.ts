import { redirect } from '@sveltejs/kit'
import {
  prisma,
  type Course,
  type TrainingSeminar,
  type TrainingSeminarQuestionOption
} from '@training-needs/database'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  const seminars = await prisma.trainingSeminar.findMany()
  return { seminars }
}

export const actions: Actions = {
  'start-new': async ({ request }) => {
    const form = await request.formData()

    const selection = JSON.parse(
      form.get('selection') as string
    ) as TrainingSeminar[]

    if (!selection.length) {
      return {
        status: 403,
        error: 'Please select at least one seminar'
      }
    }

    const seminars: (TrainingSeminar & {
      course: Course
      questions: {
        text: string
        options: TrainingSeminarQuestionOption[]
      }[]
    })[] = []

    for (const seminar of selection) {
      const foundSeminar = await prisma.trainingSeminar.findUnique({
        where: {
          id: seminar.id
        },
        include: {
          questions: {
            include: {
              options: true
            }
          },
          course: true
        }
      })

      if (foundSeminar) {
        seminars.push(foundSeminar)
      }
    }

    const newCycle = await prisma.baseCycle.create({
      data: {
        period: 0,
        active: true,
        endDate: new Date(Date.now() + 1000 * 60 * 10),
        seminars: {
          create: seminars.map((s) => {
            return {
              title: s.title,
              description: s.description,
              courseTitle: s.course.title,
              questions: {
                create: s.questions.map((q) => ({
                  text: q.text,
                  options: {
                    create: q.options.map((o) => ({
                      label: o.label,
                      isCorrect: o.isCorrect
                    }))
                  }
                }))
              }
            }
          })
        }
      }
    })

    if (newCycle) {
      redirect(308, '/private/dashboard/voting')
    }
  }
}
