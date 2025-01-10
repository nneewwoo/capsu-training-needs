<script lang="ts">
  import { XMark } from '$lib/icons'
  import { rotate } from '$lib/transitions'
  import type { Snippet } from 'svelte'
  import { fade, slide, scale } from 'svelte/transition'

  let {
    open,
    children,
    onclose
  }: { open: boolean; children: Snippet; onclose: () => {} } = $props()
</script>

{#if open}
  <div in:fade out:fade class="absolute top-0 left-0 h-full w-full bg-black/50">
  </div>
  <div class="absolute bottom-0 left-0 h-fit w-full" in:slide out:slide>
    <div class="bg-surface h-full w-full rounded-t-4xl px-12 py-8">
      <div class="flex w-full justify-end">
        <button
          in:rotate={{ deg: 180, duration: 400 }}
          type="button"
          onclick={() => onclose()}
          class="text-on-surface w-fit translate-x-1/2 transform bg-inherit p-3">
          <XMark class="h-5 w-5" />
        </button>
      </div>
      <div class="pt-8">
        {@render children()}
      </div>
    </div>
  </div>
{/if}
