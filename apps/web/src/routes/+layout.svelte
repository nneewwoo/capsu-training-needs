<script lang="ts">
  import '../app.css'

  let { children } = $props()
</script>

<main>
  {@render children()}
</main>
<footer
  class="mx-auto grid h-fit w-full max-w-4xl grid-cols-1 py-16 max-lg:px-8 lg:grid-cols-5">
  <div class="col-span-1 w-full space-y-4 max-lg:py-8 lg:col-span-3">
    <img src="/logo.png" alt="logo" class="h-24 w-24" />
    <p class="text-xl font-bold">CAPSU Training Needs</p>
  </div>
  <div class="col-span-1 flex flex-col space-y-4 max-lg:border-t max-lg:py-8">
    <a target="_blank" href="https://github.com/nneewwoo/capsu-training-needs"
      >GitHub</a>
  </div>
  <div class="col-span-1 flex flex-col space-y-4 max-lg:border-t max-lg:py-8">
    <a href="/privacy-policy">Privacy Policy</a>
    <a href="/terms-of-use">Terms of Use</a>
  </div>
</footer>
