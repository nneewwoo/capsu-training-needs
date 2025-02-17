<script lang="ts">
  import { enhance } from '$app/forms'
  import { notify } from '$lib/store.js'
  import type { BaseTrainingSeminar } from '@training-needs/database'
  import { Select } from 'bits-ui'
  import { DateInput } from 'date-picker-svelte'
  import { Calendar1Icon, CheckIcon, ChevronDownIcon } from 'lucide-svelte'
  import { slide } from 'svelte/transition'

  let { data, form } = $props()

  let date = $state(new Date(Date.now()))

  let seminars = $state(data.seminars)

  let countdown = $state('')
  let selectedAsWinner = $state('')

  const handleCountdown = async () => {
    const endsAt = new Date(data.cycle.endDate).getTime()

    console.log(new Date(data.cycle.endDate))

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = endsAt - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`

      if (distance > 0) {
        if (distance < 1000 * 60 * 60) {
          countdown = `${minutes}M:${seconds < 10 ? '0' : ''}${seconds}S`
        } else if (distance < 1000 * 60 * 60 * 24) {
          countdown = `${hours}H:${minutes < 10 ? '0' : ''}${minutes}M:${seconds < 10 ? '0' : ''}${seconds}S`
        } else {
          countdown = `${days} days ${hours}H:${minutes < 10 ? '0' : ''}${minutes}M:${seconds < 10 ? '0' : ''}${seconds}S`
        }
      } else {
        clearInterval(interval)
        countdown = '--:--:--'
      }
    }, 1000)
    return
  }

  $effect(() => {
    handleCountdown()
  })

  $effect(() => {
    date.setMinutes(date.getMinutes() + 30)
    const VOTING_CHANNEL = data.supabase
      .channel('voting')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'base',
          table: 'training_seminars'
        },
        (payload) => {
          const updatedSeminar = payload.new as BaseTrainingSeminar

          seminars = seminars.map((seminar) => {
            if (seminar.id === updatedSeminar.id) {
              return { ...seminar, rank: updatedSeminar.rank }
            }
            return seminar
          })

          const sort = seminars.sort((a, b) => a.rank - b.rank)

          let currentRank = 0
          let tieCount = 0
          let previousTotalRank: number | null = null

          const rankedWithPosition = sort.map((seminar, _index) => {
            if (seminar.rank !== previousTotalRank) {
              currentRank += 1 + tieCount
              tieCount = 0
            } else {
              tieCount++
            }

            previousTotalRank = seminar.rank

            return {
              ...seminar,
              position: currentRank
            }
          })
          seminars = rankedWithPosition
        }
      )
      .subscribe()

    return () => {
      data.supabase.removeChannel(VOTING_CHANNEL)
    }
  })

  $effect(() => {
    if (form && form.error) {
      notify(form.error, 'error')
    }
  })
</script>

<div class="flex w-full">
  <div class="w-full flex-1 px-2 py-8">
    <div class="flex flex-col">
      <h3 class="pb-2 text-4xl font-bold">Current Ranking</h3>
      <div class="bg-secondary-container w-full rounded-xl border p-2">
        <div class="flex w-full font-medium">
          <p class="w-4/5">Title</p>
          <p class="w-1/5">Rank</p>
        </div>
        {#each seminars as seminar}
          <div class="flex items-center border-t py-2 text-base">
            <p class="w-4/5 font-medium">{seminar.title}</p>
            <p class="w-1/5 font-medium">
              {seminar.rank === 0 ? '-' : seminar.position}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </div>
  <aside class="w-1/3 px-2 py-8">
    <div class="w-full">
      <h5 class="text-lg font-bold">Events</h5>
      <div class="flex flex-col">
        <div
          class="bg-secondary-container flex w-full flex-col rounded-xl border p-2">
          {#if countdown !== '--:--:--'}
            <h1 class="pb-4 text-center text-sm font-bold">
              Users are voting for seminar topics
            </h1>
            <h1 class="text-center text-5xl font-bold">{countdown}</h1>
          {:else}
            <p class="text-base font-medium">Ends at</p>
            <div class="flex items-center space-x-2">
              <Calendar1Icon size={16} />
              <DateInput bind:value={date} />
            </div>
          {/if}
        </div>
        <form
          action="?/change-period"
          method="POST"
          use:enhance
          class="mt-4 flex w-full flex-col justify-end">
          {#if form && form.error.includes('tie')}
            <Select.Root
              onSelectedChange={(selected) => {
                selectedAsWinner = selected?.value!
              }}
              items={form.tiedSeminars.map((seminar) => ({
                label: seminar.title,
                value: seminar.id
              }))}>
              <Select.Trigger
                class="bg-surface text-on-surface mb-4 flex w-full justify-between rounded-xl px-4 py-2 text-start">
                <Select.Value placeholder="Select the winner for this period" />
                <ChevronDownIcon size="16" />
              </Select.Trigger>

              <Select.Content
                transition={slide}
                class="bg-surface text-on-surface w-1/2 rounded-xl border p-2">
                {#each form.tiedSeminars.map( (seminar) => ({ label: seminar.title, value: seminar.id }) ) as seminar}
                  <Select.Item
                    class="data-[highlighted]:bg-secondary-container/50 flex justify-between p-2"
                    label={seminar.label}
                    value={seminar.value}
                    >{seminar.label}
                    <Select.ItemIndicator>
                      <CheckIcon size="16" />
                    </Select.ItemIndicator>
                  </Select.Item>
                {/each}
                <Select.Arrow />
              </Select.Content>
            </Select.Root>
          {/if}
          <input type="hidden" name="winner" value={selectedAsWinner} />
          <input type="hidden" name="date" value={date} />
          <button
            class="disabled:cursor-not-allowed"
            disabled={countdown !== '--:--:--'}
            type="submit">
            Next
          </button>
        </form>
      </div>
    </div>
  </aside>
</div>
