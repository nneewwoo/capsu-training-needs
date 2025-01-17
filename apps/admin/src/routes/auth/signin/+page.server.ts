import { fail, type Actions } from '@sveltejs/kit'

export const actions: Actions = {
  default: async ({ request, locals: { supabase }, url }) => {
    const form = await request.formData()

    const email = form.get('email') as string

    if (
      !new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(
        email
      )
    ) {
      return fail(403, { error: 'Please enter a valid email address' })
    }

    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: url.origin,
        shouldCreateUser: false
      }
    })

    if (error) {
      return fail(403, { error: error.message })
    }

    if (data) {
      return {
        message: 'An email has been sent to your inbox'
      }
    }
  }
}
