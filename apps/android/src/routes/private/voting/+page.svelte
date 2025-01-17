<script lang="ts">
  import { invalidate } from '$app/navigation'
  import { SortableList } from '$lib/components'
  import type { BaseTrainingSeminar } from '@training-needs/database'

  let countdown = $state('')

  let { data } = $props()

  let seminars = $state(data.seminars)
  let submitting = $state(false)

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
        if (distance < 1000 * 60 * 60 * 24) {
          countdown = `${hours}H:${minutes < 10 ? '0' : ''}${minutes}M:${seconds < 10 ? '0' : ''}${seconds}S`
        } else if (distance < 1000 * 60 * 60) {
          countdown = `${minutes}M:${seconds < 10 ? '0' : ''}${seconds}S`
        } else {
          countdown = `${days} days ${hours}H:${minutes < 10 ? '0' : ''}${minutes}M:${seconds < 10 ? '0' : ''}${seconds}S`
        }
      } else {
        clearInterval(interval)
        countdown = 'EXPIRED'
        window.location.replace('/private/times-up')
      }
    }, 1000)
    return
  }

  const ondrop = (items: BaseTrainingSeminar[]) => {
    seminars = items.map((seminar, index) => ({ ...seminar, rank: index + 1 }))
  }

  const courseToHashtag = (course: string) => {
    const regex =
      /\b(Bachelor|Master|Doctor) of (Science in|Education|Arts in|Engineering|.*?)(?=\b|$)/g
    course = course
      .replace(regex, '')
      .replace(/\s+/g, ' ')
      .replace(/^\s+|\s+$/g, '')
    return `#${course.replace(/\s/g, '').toLowerCase()}`
  }

  const handleSubmit = async () => {
    submitting = true

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/seminars/cast-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: data.user.id, seminars })
      }
    )

    if (response) {
      invalidate(
        `${import.meta.env.VITE_API_URL}/api/v1/participations/current`
      )
    }
  }

  $effect(() => {
    handleCountdown()
  })
</script>

<svelte:head>
  <title>What interests your the most?</title>
</svelte:head>

{#snippet card(seminar: BaseTrainingSeminar)}
  <div class="bg-secondary-container items-center rounded-2xl p-4">
    <div class="flex w-full flex-row-reverse">
      <div class="h-8 w-8">
        <div
          class="bg-on-surface text-surface flex h-full w-full items-center justify-center rounded-full font-serif text-xs font-bold">
          {seminar.rank}
        </div>
      </div>
    </div>
    <div class="w-full">
      <p class="font-serif text-xl font-bold">{seminar.title}</p>
    </div>
    <div class="w-full">
      <p class="text-tertiary text-xs">
        {seminar.description}
      </p>
    </div>
    <div class="border-primary/50 mt-4 w-full border-t pt-2 text-xs">
      {courseToHashtag(seminar.courseTitle)}
    </div>
  </div>
{/snippet}

<div class="h-fit w-full py-8">
  <div class="w-full text-center">
    <h1 class="font-serif text-3xl font-bold">What interests you the most?</h1>
    <p class="text-tertiary pt-4 pb-12 text-xs">
      Rank the topics from 1 (your top choice) to the rest. Ends at <span
        class="font-bold">{countdown || '--:--:--'}</span>
    </p>
  </div>
  <SortableList items={seminars} component={card} {ondrop} />
</div>
<div class="bg-surface sticky bottom-0 left-0 flex w-full py-2">
  <div class="h-full w-1/2">
    <button
      type="reset"
      onclick={() => {
        scrollTo(0, 0)
        seminars = data.seminars
      }}
      class="flex h-full w-full items-center justify-center px-4.5 py-3.5 font-semibold"
      >Reset</button>
  </div>
  <div class="h-full w-1/2">
    <button
      disabled={submitting}
      onclick={handleSubmit}
      type="button"
      class="border-none">Submit</button>
  </div>
</div>
