import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import type { BaseTrainingSeminar } from '@training-needs/database'

export const load: PageLoad = async ({ fetch, parent }) => {
  const { participation, cycle } = await parent()

  const fetchSeminars = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/seminars/current`
  )

  const seminars = (await fetchSeminars.json()) as BaseTrainingSeminar[]

  if (participation.didVote) {
    redirect(308, '/private/voting/done')
  }

  if (new Date(cycle.endDate).getTime() < new Date().getTime()) {
    redirect(308, '/private/times-up')
  }

  return {
    seminars: seminars.map((s, i) => ({ ...s, rank: i + 1 }))
  }
}
