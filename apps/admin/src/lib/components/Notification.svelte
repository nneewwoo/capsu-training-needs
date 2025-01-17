<script lang="ts">
  import XMark from '$lib/icons/XMark.svelte'
  import { notification } from '$lib/store'
  import { fade } from 'svelte/transition'
</script>

{#if $notification.message}
  <div
    in:fade={{ duration: 200 }}
    out:fade={{ duration: 200 }}
    class={`fixed right-4 bottom-4 flex max-w-xs space-x-4 rounded-xl p-4 text-start text-sm ${$notification.type === 'success' ? 'bg-success text-on-success' : $notification.type === 'error' ? 'bg-error text-on-error' : 'bg-info text-on-info'}`}>
    <p class="flex w-full items-center text-wrap break-words">
      {$notification.message}
    </p>
    <div class="flex w-fit justify-end">
      <button
        type="button"
        onclick={() => {
          notification.set({ message: '', type: null })
        }}
        class="border-surface w-fit transform bg-inherit p-2">
        <XMark class="h-5 w-5" />
      </button>
    </div>
  </div>
{/if}
