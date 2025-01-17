<script lang="ts">
  import { enhance } from '$app/forms'
  import { notify } from '$lib/store'
  import type { TrainingSeminar } from '@training-needs/database'
  import { Trash2Icon } from 'lucide-svelte'

  let { data, form } = $props()

  let seminars = $state(data.seminars)

  let selection: TrainingSeminar[] = $state([])

  $effect(() => {
    if (form && form.error) {
      notify(form.error, 'error')
    } else if (form && form.message) {
      notify(form.message, 'success')
    }
  })
</script>

<div class="flex w-full">
  <div class="w-full flex-1 px-2 py-8">
    <div class="flex flex-col">
      <h3 class="pb-2 text-4xl font-bold">Select seminars</h3>
      <div class="flex w-full flex-wrap gap-y-2 space-x-4">
        {#each seminars as seminar}
          <button
            onclick={() => {
              selection = [...selection, seminar]
              seminars = seminars.filter((s) => s.id !== seminar.id)
            }}
            class="rounded-full border px-4 py-2">{seminar.title}</button>
        {/each}
      </div>
    </div>
  </div>
  <aside class="w-1/3 px-2 py-8">
    <div class="w-full">
      <h5 class="text-lg font-bold">Selection</h5>
      <div
        class="bg-secondary-container mb-4 h-fit w-full rounded-xl border p-2">
        <div class="flex h-full w-full flex-col">
          {#if selection.length === 0}
            <p class="text-center text-base font-medium">
              No seminars selected
            </p>
          {:else}
            {#each selection as seminar}
              <div class="flex w-full items-center p-2">
                <button
                  onclick={() => {
                    seminars = [...seminars, seminar]
                    selection = selection.filter((s) => s.id !== seminar.id)
                  }}
                  class="text-error">
                  <Trash2Icon size={16} />
                </button>
                <p class="pl-4 font-medium">
                  {seminar.title}
                </p>
              </div>
            {/each}
          {/if}
        </div>
      </div>
      <form method="POST" use:enhance action="?/start-new">
        <input
          type="hidden"
          name="selection"
          value={JSON.stringify(selection)} />
        <button type="submit">Start</button>
      </form>
    </div>
  </aside>
</div>
