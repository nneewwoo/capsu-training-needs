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

  const improved = (pre: number, post: number) => {
    if (post - pre < 0) return 'Bad'
    else if (pre === post) return 'Fair'
    else return 'Better'
  }

  let winningSeminar: BaseTrainingSeminar | null = $state(null)
  let pretestResults: Partial<BasePretestResponse>[] = $state([])
  let posttestResults: Partial<BasePretestResponse>[] = $state([])

  let results: Partial<{
    id: string
    createdAt: Date
    cycleId: string
    user: {
      id: string
      email: string
      name: string
      photo_url: string
    }
    scorePre: number
    scorePost: number
  }>[] = $state([])
</script>

<div class="flex w-full">
  <div class="w-full flex-1 px-2 py-8">
    <div class="flex flex-col">
      <h3 class="pb-2 text-4xl font-bold">Past Results</h3>
      <Select.Root
        onSelectedChange={async (selected) => {
          try {
            goto(`/private/records/archive?id=${selected?.value}`, {
              invalidateAll: true,
              state: { course_id: selected?.value }
            })

            const [winner, pretest, posttest] = await Promise.all([
              data.supabase
                .schema('base')
                .from('training_seminars')
                .select('*')
                .eq('cycle_id', selected?.value)
                .eq('is_winner', true)
                .single(),

              data.supabase
                .schema('base')
                .from('pretest_responses')
                .select(
                  `
                id,
                created_at,
                cycle_id,
                user:users (
            id,
            email,
            name,
            photo_url
          ),
                score
              `
                )
                .eq('cycle_id', selected?.value),

              data.supabase
                .schema('base')
                .from('posttest_responses')
                .select(
                  `
                id,
                created_at,
                cycle_id,
                user:users (
            id,
            email,
            name,
            photo_url
          ),
                score
              `
                )
                .eq('cycle_id', selected?.value)
            ])

            const map = new Map()

            console.log(winner.data)

            winningSeminar = winner.data! as BaseTrainingSeminar

            pretest.data.forEach((pre) => {
              map.set(pre.user.id, {
                id: pre.id,
                createdAt: new Date(pre.created_at),
                cycleId: pre.cycle_id,
                user: pre.user,
                scorePre: pre.score ?? null,
                scorePost: null
              })
            })

            posttest.data.forEach((post) => {
              if (map.has(post.user.id)) {
                map.get(post.user.id).scorePost = post.score ?? null
              } else {
                map.set(post.user.id, {
                  id: post.id,
                  createdAt: new Date(post.created_at),
                  cycleId: post.cycle_id,
                  user: post.user,
                  scorePre: null,
                  scorePost: post.score ?? null
                })
              }
            })

            results = Array.from(map.values())
          } catch (error) {
            console.error('Failed to fetch data:', error)
          }
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
        <p class="p-2 text-xs font-bold">Pre/Post-test Results</p>
        <div class="bg-secondary-container mt-2 w-full rounded-xl border p-2">
          <div class="flex w-full p-2 text-xs font-bold">
            <p class="w-3/5">Full Name</p>
            <p class="w-1/5">Pre-Test</p>
            <p class="w-1/5">Post-Test</p>
            <p class="w-1/5">Improvement</p>
          </div>
          {#each results as result}
            <div class="flex w-full border-t p-2">
              <p class="w-3/5">{result.user?.name ?? 'N/A'}</p>
              <p class="w-1/5">{result.scorePre ?? '-'}</p>
              <p class="w-1/5">{result.scorePost ?? '-'}</p>
              <p class="w-1/5">
                {improved(result.scorePre ?? 0, result.scorePost ?? 0)}
              </p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
