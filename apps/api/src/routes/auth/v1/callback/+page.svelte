<script lang="ts">
  import { page } from '$app/state'

  const onRequest = async () => {
    const access_token = new URLSearchParams(page.url.hash.substring(1)).get(
      'access_token'
    )
    const refresh_token = new URLSearchParams(page.url.hash.substring(1)).get(
      'refresh_token'
    )

    await fetch(`${import.meta.env.VITE_WS_URL_HTTP}/auth/v1/callback`, {
      method: 'POST',
      body: JSON.stringify({ access_token, refresh_token })
    })
    window.location.replace(
      `${import.meta.env.VITE_MAIN_DOMAIN_URL}/auth/verified`
    )
  }

  $effect(() => {
    onRequest()
  })
</script>
