<script lang="ts">
  import { goto } from '$app/navigation'
  import { supabase } from '$lib/supabase'

  let { children } = $props()

  $effect(() => {
    const socket = new WebSocket(
      `${import.meta.env.VITE_WS_URL}/auth/v1/callback/ws`
    )

    socket.onopen = (_event: WebSocketEventMap['open']) => {
      console.info('WebSocket client connected')
    }

    socket.onerror = (event: WebSocketEventMap['error']) => {
      console.error('WebSocket error:', event)
    }

    socket.onclose = (_event: WebSocketEventMap['close']) => {
      console.info('WebSocket client disconnected')
    }

    socket.onmessage = async (event: WebSocketEventMap['message']) => {
      const data = JSON.parse(event.data) as {
        refresh_token: string
        access_token: string
      }

      await supabase.auth.setSession({
        access_token: data.access_token,
        refresh_token: data.refresh_token
      })

      goto('/')
    }
    return () => {
      socket.close()
    }
  })
</script>

{@render children()}
