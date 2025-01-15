import { error, redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import { supabase } from '$lib/supabase'

export const load: PageLoad = async () => {
  const {
    data: { session },
    error: supabaseError
  } = await supabase.auth.getSession()

  if (supabaseError) {
    throw error(supabaseError.status ?? 400, supabaseError.message)
  }

  if (!session) {
    redirect(302, '/auth/signin')
  }

  redirect(308, '/private')
}
