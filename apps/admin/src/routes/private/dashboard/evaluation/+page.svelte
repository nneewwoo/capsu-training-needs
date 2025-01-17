<script lang="ts">
  import { enhance } from '$app/forms'

  let { data, form } = $props()

  let responses = $state(data.responses)

  let countdown = $state('')

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
    const FEEDBACK_CHANNEL = data.supabase
      .channel('feedback-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'base',
          table: 'feedback_responses'
        },
        (payload) => {
          const updatedResponse = payload.new as (typeof data.responses)[0]

          responses = [...responses, updatedResponse]
        }
      )
      .subscribe()

    return () => {
      data.supabase.removeChannel(FEEDBACK_CHANNEL)
    }
  })
</script>

<div class="flex w-full">
  <div class="w-full flex-1 px-2 py-8">
    <div class="flex flex-col">
      <h3 class="pb-2 text-4xl font-bold">Recent Feedbacks</h3>
      <div class="bg-secondary-container w-full rounded-xl border p-2">
        <div class="flex w-full font-medium">
          <p class="w-3/6">Question</p>
          <p class="w-1/6">Rating</p>
          <p class="w-3/6">Feedback</p>
        </div>
        {#each responses as response}
          <div class="flex items-center border-t py-2 text-xs">
            <p class="w-3/6 font-medium">{response.feedbackQuestion}</p>
            <p class="w-1/6 font-medium">
              {response.type === 'RATING' ? response.feedback : 'N/A'}
            </p>
            <p class="w-3/6 font-medium">
              {response.type === 'TEXT' ? response.feedback : 'N/A'}
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
          <h1 class="pb-4 text-center text-sm font-bold">
            Users are giving feedbacks
          </h1>
          <h1 class="text-center text-5xl font-bold">{countdown}</h1>
        </div>
        <form
          action="?/change-period"
          method="POST"
          use:enhance
          class="mt-4 flex w-full flex-col justify-end">
          <input type="hidden" name="cycleId" value={data.cycle.id} />
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
