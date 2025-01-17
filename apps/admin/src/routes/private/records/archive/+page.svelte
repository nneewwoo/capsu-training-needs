<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/state'
  import type {
    BasePretestResponse,
    BaseTrainingSeminar
  } from '@training-needs/database'
  import { Select } from 'bits-ui'
  import { CheckIcon, ChevronDownIcon } from 'lucide-svelte'
  import { slide } from 'svelte/transition'

  let { data } = $props()

  let cycles = data.cycles.map((cycle) => ({
    label:
      cycle.startDate.toLocaleDateString() +
      ' - ' +
      cycle.endDate.toLocaleDateString(),
    value: cycle.id
  }))

  let winningSeminar: BaseTrainingSeminar | null = $state(null)
  let pretestResults: Partial<BasePretestResponse>[] = $state([])
  let posttestResults: Partial<BasePretestResponse>[] = $state([])
</script>

<div class="flex w-full">
  <div class="w-full flex-1 px-2 py-8">
    <div class="flex flex-col">
      <h3 class="pb-2 text-4xl font-bold">Past Results</h3>
      <Select.Root
        onSelectedChange={async (selected) => {
          goto(`/private/records/archive?id${selected?.value}`, {
            invalidateAll: true,
            state: { course_id: selected?.value }
          })

          const winner = await data.supabase
            .schema('base')
            .from('training_seminars')
            .select('*')
            .eq('cycle_id', selected?.value)
            .eq('is_winner', true)

          winningSeminar = winner.data![0] as BaseTrainingSeminar

          const pretest = await data.supabase
            .schema('base')
            .from('pretest_responses')
            .select(
              `
      id,
      created_at,
      score,
      user:users (
        id,
        email,
        name,
        photo_url
      )
    `
            )
            .eq('cycle_id', selected?.value)
          pretestResults = pretest.data as BasePretestResponse[]

          const posttest = await data.supabase
            .schema('base')
            .from('posttest_responses')
            .select(
              `
      id,
      created_at,
      score,
      user:users (
        id,
        email,
        name,
        photo_url
      )
    `
            )
            .eq('cycle_id', selected?.value)
          posttestResults = posttest.data as BasePretestResponse[]
        }}
        items={cycles}>
        <Select.Trigger
          class="bg-surface text-on-surface flex w-full max-w-sm justify-between rounded-xl px-4 py-2 text-start">
          <Select.Value placeholder="Select Period" />
          <ChevronDownIcon size="16" />
        </Select.Trigger>

        <Select.Content
          transition={slide}
          class="bg-surface text-on-surface w-fit rounded-xl border p-2">
          {#each cycles as cycle}
            <Select.Item
              class="data-[highlighted]:bg-secondary-container/50 flex justify-between p-2"
              label={cycle.label}
              value={cycle.value}
              >{cycle.label}
              <Select.ItemIndicator>
                <CheckIcon size="16" />
              </Select.ItemIndicator>
            </Select.Item>
          {/each}
          <Select.Arrow />
        </Select.Content>
      </Select.Root>
      <div class="mt-2 flex w-full flex-col">
        <div class="mb-4 flex w-full p-2 text-xs font-bold">
          <p class="w-full">Chosen Topic: {winningSeminar?.title}</p>
        </div>
        <p class="p-2 text-xs font-bold">Pre-test results</p>
        <div class="bg-secondary-container mt-2 w-full rounded-xl border p-2">
          <div class="flex w-full p-2 text-xs font-bold">
            <p class="w-4/5">Full Name</p>
            <p class="w-1/5">Score</p>
          </div>
          {#each pretestResults as result}
            <div class="flex w-full border-t p-2">
              <p class="w-4/5">{result.user.name}</p>
              <p class="w-1/5">{result.score}</p>
            </div>
          {/each}
        </div>
        <p class="p-2 text-xs font-bold">Post-test results</p>
        <div class="bg-secondary-container mt-2 w-full rounded-xl border p-2">
          <div class="flex w-full p-2 text-xs font-bold">
            <p class="w-4/5">Full Name</p>
            <p class="w-1/5">Score</p>
          </div>
          {#each posttestResults as result}
            <div class="flex w-full border-t p-2">
              <p class="w-4/5">{result.user.name}</p>
              <p class="w-1/5">{result.score}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
