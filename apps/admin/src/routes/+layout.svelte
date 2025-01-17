<script lang="ts">
  import '../app.css'
  import { Notification } from '$lib/components'
  import { invalidate } from '$app/navigation'

  let { data: props, children } = $props()

  $effect(() => {
    const { data } = props.supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== props.session?.expires_at) {
        invalidate('supabase:auth')
      }
    })

    return () => data.subscription.unsubscribe()
  })
</script>

<Notification />
{@render children()}
