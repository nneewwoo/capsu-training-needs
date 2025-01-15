import type { PageLoad } from './$types'

export const load: PageLoad = async () => {
  const feedbackDone = JSON.parse(
    localStorage.getItem('feedback-done') || '[]'
  ) as string[]

  return {
    feedbackDone
  }
}
