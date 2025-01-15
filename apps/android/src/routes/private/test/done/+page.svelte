<script lang="ts">
  import { Sparkles } from '$lib/components/index.js'
  import { cubicOut } from 'svelte/easing'
  import { Tween } from 'svelte/motion'

  let { data } = $props()

  const tween = Tween.of(() => 0, {
    duration: 3000,
    easing: cubicOut
  })

  const percentage = (data.score / data.count) * 100

  $effect(() => {
    tween.set(data.score)
  })
</script>

<div
  class="flex h-[calc(100vh_-_5rem)] w-full flex-col items-center justify-center px-8">
  <div class="relative inline-block">
    <p class="text-center text-xl font-medium">You got</p>
    <h1 class="text-center font-serif text-[12rem] leading-42 font-semibold">
      {#if tween.current < tween.target}
        {tween.current.toFixed(0)}
      {:else}
        {tween.target.toFixed(0)}
      {/if}
    </h1>
    <p class="pb-8 text-center text-xl font-medium">
      of {data.count} questions correct!
    </p>
    {#if tween.current >= tween.target && percentage >= 50}
      <Sparkles colors={{ first: '#5e621b', second: '#5f6044' }} />
    {/if}
  </div>

  <p class="text-center text-sm" data-g>
    {#if percentage >= 75}
      {data.titlesHigh[Math.floor(Math.random() * data.titlesHigh.length)]}
    {:else if percentage >= 50}
      {data.titlesMedium[Math.floor(Math.random() * data.titlesMedium.length)]}
    {:else}
      {data.titlesLow[Math.floor(Math.random() * data.titlesLow.length)]}
    {/if}
  </p>
</div>
