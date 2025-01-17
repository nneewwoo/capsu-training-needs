<script lang="ts">
  import type { User } from '@training-needs/database'

  let { data, children } = $props()

  const { cycle } = data
</script>

<div class="flex w-full">
  <div class="w-full flex-1 px-2 py-8">
    {@render children()}
  </div>
  {#if !cycle}
    <aside class="w-1/3 px-2 py-8">
      <div class="w-full">
        <h5 class="text-lg font-bold">Events</h5>
        <div class="flex flex-col">
          <div
            class="bg-secondary-container flex w-full flex-col rounded-xl border p-2">
            <h1 class="text-center text-sm font-bold">No ongoing events</h1>
          </div>
          <div class="mt-4 flex w-full justify-end">
            <a role="button" href="/private/new">Start</a>
          </div>
        </div>
      </div>
    </aside>
  {/if}
</div>
