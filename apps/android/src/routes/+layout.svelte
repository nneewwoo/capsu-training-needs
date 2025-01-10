<script lang="ts">
  import '../app.css'

  let { children } = $props()
</script>

<main class="h-screen w-screen overflow-hidden overscroll-none">
  {@render children()}
</main>
