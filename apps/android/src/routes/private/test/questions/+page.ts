import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import type {
  BaseTrainingSeminarQuestion,
  BaseTrainingSeminarQuestionOption
} from '@training-needs/database'

export const load: PageLoad = async ({ fetch, parent }) => {
  const { participation, cycle } = await parent()

  if (cycle.period === 1 && participation.didPretest) {
    redirect(308, '/private/test/done')
  }

  if (cycle.period === 3 && participation.didPosttest) {
    redirect(308, '/private/test/done')
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/seminars/questions/current`,
    { method: 'GET' }
  )

  const questions = (await response.json()) as (BaseTrainingSeminarQuestion & {
    options: BaseTrainingSeminarQuestionOption[]
  })[]

  interface UnansweredQuestion {
    id: BaseTrainingSeminarQuestion['id']
    text: BaseTrainingSeminarQuestion['text']
    options: BaseTrainingSeminarQuestionOption[]
    choice: BaseTrainingSeminarQuestionOption['id'] | null
  }

  const unansweredQuestions: UnansweredQuestion[] = questions.map((q) => ({
    id: q.id,
    text: q.text,
    options: q.options,
    choice: null
  }))

  return { questions: unansweredQuestions, fetch }
}
