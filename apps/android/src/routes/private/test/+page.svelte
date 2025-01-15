<script lang="ts">
  let { data } = $props()
</script>

<div
  class="flex h-[calc(100vh_-_5rem)] w-full flex-col items-center justify-center px-8">
  <h1 class="pb-8 text-center font-serif text-5xl font-semibold">
    {#if data.period === 1}
      “{data.winner.title}” won!
    {:else}
      Welcome back!
    {/if}
  </h1>
  <p class="text-center text-sm" data-g>
    {data.titles[Math.floor(Math.random() * data.titles.length)]}
  </p>
  <a role="button" href="/private/test/questions" class="mt-4 w-fit border-none"
    >Start Answering</a>
</div>
