<script lang="ts">
  import { enhance } from '$app/forms'
  import { DateInput } from 'date-picker-svelte'
  import { Calendar1Icon } from 'lucide-svelte'

  let { data, form } = $props()

  let responses = $state(data.responses)

  let countdown = $state('')
  let selectedAsWinner = $state('')

  let date = $state(new Date(Date.now()))

  const handleCountdown = async () => {
    const endsAt = new Date(data.cycle.endDate).getTime()

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
    const POSTTEST_CHANNEL = data.supabase
      .channel('posttest-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'base',
          table: 'posttest_responses'
        },
        (payload) => {
          const updatedResponse = payload.new as (typeof data.responses)[0]

          responses = [...responses, updatedResponse]
        }
      )
      .subscribe()

    return () => {
      data.supabase.removeChannel(POSTTEST_CHANNEL)
    }
  })
</script>

<div class="flex w-full">
  <div class="w-full flex-1 px-2 py-8">
    <div class="flex flex-col">
      <h3 class="pb-2 text-4xl font-bold">Current Results</h3>
      <div class="bg-secondary-container w-full rounded-xl border p-2">
        <div class="flex w-full font-medium">
          <p class="w-4/5">Full Name</p>
          <p class="w-1/5">Score</p>
        </div>
        {#each responses as response}
          <div class="flex items-center border-t py-2 text-base">
            <p class="w-4/5 font-medium">{response.user.name}</p>
            <p class="w-1/5 font-medium">
              {response.score}
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
              Users are answering post-test
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
          <input type="hidden" name="cycleId" value={data.cycle.id} />
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
