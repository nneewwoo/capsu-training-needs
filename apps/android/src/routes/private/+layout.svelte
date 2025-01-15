<script lang="ts">
  import { invalidate } from '$app/navigation'
  import { page } from '$app/state'
  import { Divider } from '$lib/components/index.js'
  import { supabase } from '$lib/supabase.js'
  import { online, scrollY } from 'svelte/reactivity/window'
  import { fade, fly } from 'svelte/transition'

  let { data, children } = $props()

  let showMenu: boolean = $state(false)
</script>

<svelte:document
  onclick={(event: MouseEvent) => {
    if (event.target && !(event.target as Element).closest('.menu')) {
      showMenu = false
    }
  }} />

{#snippet header()}
  <div
    class="bg-surface flex h-fit w-full items-center justify-between px-8 py-4">
    {#if Number(scrollY.current || 0) > 120}
      <h1 in:fade class="font-bold">{document.title}</h1>
    {:else}
      <h1 in:fade>
        Welcome, <span class="font-bold"
          >{data.user.user_metadata.full_name}</span>
      </h1>
    {/if}
    <button
      onclick={() => {
        showMenu = !showMenu
      }}
      class="menu relative h-12 w-12 rounded-full">
      {#if 'picture' in data.user.user_metadata}
        <img
          src={data.user.user_metadata.picture}
          alt="user_photo"
          class="rounded-full" />
      {:else}
        <div
          class="bg-secondary text-on-secondary flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold">
          {String(data.user.user_metadata.full_name).at(0)}
        </div>
      {/if}
      <div
        class={`${online.current ? 'bg-green-500' : 'bg-gray-300'} border-surface absolute right-0 bottom-0 h-4 w-4 rounded-full border-3`}>
      </div>
    </button>
    {#if showMenu}
      <div
        in:fly={{ y: -5, duration: 200 }}
        out:fly={{ y: -5, duration: 200 }}
        class="absolute top-8 right-4 mt-2 h-fit w-fit min-w-32 translate-y-12 transform rounded-xl bg-white p-4 text-sm shadow">
        <div class="w-full text-end">
          <p>{data.user.email}</p>
        </div>
        <Divider />
        <button
          onclick={async () => {
            showMenu = false
            await supabase.auth.signOut()
            invalidate('supabase:authed')
          }}
          class="w-full text-end"
          >Si<span class="font-work text-[15px]">g</span>n Out</button>
      </div>
    {/if}
  </div>
{/snippet}

<div class="mx-auto flex h-full w-full max-w-lg flex-col">
  <div class="sticky top-0 left-0 z-[997] mx-auto w-full max-w-lg">
    {@render header()}
  </div>
  <div class="h-full w-full">
    <div class="h-fit w-full px-2">
      {@render children()}
    </div>
  </div>
</div>
