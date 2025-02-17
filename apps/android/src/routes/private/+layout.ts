import { error, redirect } from '@sveltejs/kit'
import type { LayoutLoad } from './$types'
import type { BaseCycle, BaseParticipation } from '@training-needs/database'
import { supabase } from '$lib/supabase'

export const load: LayoutLoad = async ({ fetch, depends }) => {
  const {
    data: { session }
  } = await supabase.auth.getSession()
  if (!session) {
    redirect(302, '/auth/signin')
  }

  depends('supabase:authed')

  const {
    data: { user },
    error: supabaseError
  } = await supabase.auth.getUser()

  if (supabaseError) {
    throw error(supabaseError.status ?? 400, supabaseError.message)
  }

  if (!user) {
    redirect(302, '/auth/signin')
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/cycles/current`,
    {
      method: 'GET'
    }
  )

  const fetchParticipation = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/participations/current`,
    {
      method: 'POST',
      body: JSON.stringify({ userId: user.id })
    }
  )

  const participation = (await fetchParticipation.json()) as BaseParticipation

  const activeCycle = (await response.json()) as BaseCycle

  const endDate = new Date(
    new Date(activeCycle?.endDate || Date.now()).toLocaleString()
  )

  const cycle = { ...activeCycle, endDate }

  return {
    user,
    cycle,
    participation
  }
}
