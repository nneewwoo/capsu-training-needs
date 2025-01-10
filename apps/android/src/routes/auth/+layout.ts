import { error, redirect } from '@sveltejs/kit'
import type { LayoutLoad } from './$types'
import { supabase } from '$lib/supabase'

export const load: LayoutLoad = async () => {
  const {
    data: { session },
    error: supabaseError
  } = await supabase.auth.getSession()

  if (supabaseError) {
    throw error(supabaseError.status ?? 400, supabaseError.message)
  }

  if (session) {
    redirect(302, '/')
  }
  return {}
}
