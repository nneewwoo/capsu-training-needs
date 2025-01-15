import { createClient, type Provider } from '@supabase/supabase-js'
import { open } from '@tauri-apps/plugin-shell'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export const signInWithOAuth = async (provider: Provider) => {
  if (
    typeof window !== 'undefined' &&
    typeof window.__TAURI_INTERNALS__ !== 'undefined'
  ) {
    await open(
      `${import.meta.env.VITE_SUPABASE_URL}/auth/v1/authorize?provider=${provider}&redirect_to=${import.meta.env.VITE_API_URL}/auth/v1/callback`
    )
  } else {
    await supabase.auth.signInWithOAuth({
      provider
    })
  }
}
