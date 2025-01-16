import {
  cancel,
  type OauthConfig,
  onUrl,
  start
} from '@fabianlars/tauri-plugin-oauth'
import { createClient, type Provider } from '@supabase/supabase-js'
import { open } from '@tauri-apps/plugin-shell'
import { goto } from '$app/navigation'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export const signInWithOAuth = async (provider: Provider) => {
  if (
    typeof window !== 'undefined' &&
    typeof window.__TAURI_INTERNALS__ !== 'undefined'
  ) {
    const port = await start(oauthConfig)
    await open(
      `${import.meta.env.VITE_SUPABASE_URL}/auth/v1/authorize?provider=${provider}&redirect_to=http://localhost:14141`
    )
    await onUrl(async (url) => {
      const urlObject = new URL(url)

      const access_token = new URLSearchParams(urlObject.hash.substring(1)).get(
        'access_token'
      )
      const refresh_token = new URLSearchParams(
        urlObject.hash.substring(1)
      ).get('refresh_token')

      if (access_token && refresh_token) {
        supabase.auth.setSession({ access_token, refresh_token })
        goto('/')
      }

      await cancel(port)
    })
  } else {
    await supabase.auth.signInWithOAuth({
      provider
    })
  }
}

export const oauthConfig: OauthConfig = {
  ports: [14141, 14142, 14145],
  response: `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CAPSU Training Needs</title><script>window.location.href="${import.meta.env.VITE_MAIN_DOMAIN_URL}/auth/verified"</script></head><body></body></html>`
}
