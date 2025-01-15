import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ url, parent, fetch }) => {
  const id = url.searchParams.get('id')

  const { feedbacks } = await parent()

  const category = feedbacks.find((category) => category.id === id)

  if (!category) {
    throw error(404, 'An unknown error occurred')
  }

  return {
    category,
    fetch
  }
}
