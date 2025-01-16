<script lang="ts">
  import { Notification } from '$lib/components'
  import '../app.css'

  let { children } = $props()
</script>

<Notification />
<main class="h-full min-h-screen w-screen overscroll-none">
  {@render children()}
</main>
