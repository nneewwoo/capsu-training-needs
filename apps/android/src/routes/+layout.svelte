<script lang="ts">
  import { Notification } from '$lib/components'
  import { transitioning } from '$lib/store'
  import '../app.css'

  let { children } = $props()
</script>

<Notification />
{#if $transitioning}
  Loading...
{:else}
  <main class="h-full min-h-screen w-screen overscroll-none">
    {@render children()}
  </main>
{/if}
