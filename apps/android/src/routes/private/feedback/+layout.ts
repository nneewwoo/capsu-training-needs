import { error } from '@sveltejs/kit'
import type { LayoutLoad } from './$types'
import type {
  FeedbackCategory,
  FeedbackQuestion
} from '@training-needs/database'

export const load: LayoutLoad = async ({ fetch, parent }) => {
  const { participation } = await parent()

  if (!participation.didAttend) {
    throw error(403, 'You must attend the seminar to provide feedback')
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/feedbacks/reference`
  )
  const feedbacks = (await response.json()) as (FeedbackCategory & {
    questions: FeedbackQuestion[]
  })[]

  if (response.ok) {
    return {
      feedbacks
    }
  }
  return {
    feedbacks: []
  }
}
