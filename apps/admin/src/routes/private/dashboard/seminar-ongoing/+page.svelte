<script lang="ts">
  import { enhance } from '$app/forms'
  import { notify } from '$lib/store'

  let { data, form } = $props()

  let users = $state(data.users)

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
    if (form && form.message && form.userId) {
      notify(form.message, 'success')

      users = users.filter((u) => u.user.id !== form.userId)
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
          <p class="w-1/5">Set Attended</p>
        </div>
        {#each users as user}
          <div class="flex items-center border-t py-2 text-base">
            <p class="w-4/5 font-medium">{user.user.name}</p>
            <form
              class="w-1/5 font-medium"
              action="?/set-attended"
              method="POST"
              use:enhance>
              <input type="hidden" name="userId" value={user.user.id} />
              <button
                type="submit"
                class="text-on-secondary-container hover:bg-secondary-fixed-dim h-fit w-fit bg-inherit px-4 py-2 text-xs">
                Attended
              </button>
            </form>
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
          <h1 class="pb-4 text-center text-sm font-bold">Seminar is ongoing</h1>
          <h1 class="text-center text-5xl font-bold">{countdown}</h1>
        </div>
        <form
          action="?/change-period"
          method="POST"
          use:enhance
          class="mt-4 flex w-full flex-col justify-end">
          <input type="hidden" name="cycleId" value={data.cycle.id} />
          <button class="disabled:cursor-not-allowed" type="submit">
            Stop
          </button>
        </form>
      </div>
    </div>
  </aside>
</div>
