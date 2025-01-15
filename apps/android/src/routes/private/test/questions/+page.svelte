<script lang="ts">
  import { fly } from 'svelte/transition'
  import { Motion } from 'svelte-motion'
  import { goto, invalidate } from '$app/navigation'
  import { CheckBox } from '$lib/components/index.js'

  let { data } = $props()

  let countdown = $state('')

  let submitting = $state(false)

  let currentIndex = $state(0)

  let unansweredQuestions: typeof data.questions = $state(data.questions)
  let willAnswerQuestions: typeof data.questions = $state(
    data.questions.slice(0, 4)
  )
  let answeredQuestions: typeof data.questions = $state([])

  let selectedChoice:
    | (typeof data.questions)[number]['options'][number]['id']
    | null = $state(null)

  const handleSubmit = async () => {
    submitting = true

    const respones = await data.fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/seminars/questions/answer`,
      {
        method: 'POST',
        body: JSON.stringify({
          cycleId: data.cycle.id,
          period: data.cycle.period,
          userId: data.user.id,
          answers: answeredQuestions
        })
      }
    )

    if (respones.ok) {
      await invalidate(
        `${import.meta.env.VITE_API_URL}/api/v1/participations/current`
      )
      if (data.cycle.period === 3) {
        localStorage.removeItem('feedback-done')
      }
      submitting = false
    }
  }

  const next = () => {
    answeredQuestions = [
      ...answeredQuestions,
      {
        ...willAnswerQuestions[0],
        choice: selectedChoice
      }
    ]
    if (currentIndex === data.questions.length - 1) {
      handleSubmit()
      return
    }

    if (willAnswerQuestions.length > 0) {
      unansweredQuestions = unansweredQuestions.slice(1)
      willAnswerQuestions = unansweredQuestions.slice(0, 4)

      currentIndex += 1

      selectedChoice = null
      goto(`/private/test/questions`)
    }
  }

  const skip = () => {
    if (willAnswerQuestions.length > 0) {
      unansweredQuestions = [
        ...unansweredQuestions.filter(
          (q) => q.id !== willAnswerQuestions[0].id
        ),
        willAnswerQuestions[0]
      ]
      willAnswerQuestions.shift()
      willAnswerQuestions = unansweredQuestions.slice(0, 4)
    }
  }

  const onpopstate = () => {
    if (answeredQuestions.length === 0) {
      return
    }

    const returnQuestion = answeredQuestions[answeredQuestions.length - 1]
    selectedChoice = returnQuestion.choice
    answeredQuestions = answeredQuestions.slice(0, -1)
    unansweredQuestions = [returnQuestion, ...unansweredQuestions]
    willAnswerQuestions = unansweredQuestions.slice(0, 4)
    currentIndex -= 1
  }

  const CARD_OFFSET = 28
  const SCALE_FACTOR = 0.05

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

  $effect(() => {
    handleCountdown()
  })
</script>

<svelte:window {onpopstate} />
<svelte:head>
  <title>{currentIndex + 1} of {data.questions.length}</title>
</svelte:head>

<div class="flex h-[calc(100vh_-_88px)] w-full flex-col">
  <div class="font-work w-full justify-center text-xs font-medium">
    <div class="flex w-full justify-between">
      <p>{currentIndex + 1} of {data.questions.length}</p>

      <p>Ends at {countdown || '--:--:--'}</p>
    </div>
    <div class="bg-primary/20 h-2 w-full overflow-hidden rounded-full">
      <div
        style={`width: ${((currentIndex + 1) / data.questions.length) * 100}%;`}
        class={`bg-primary h-full transition-all duration-200`}>
      </div>
    </div>
  </div>
  <div class="h-full w-full pt-16">
    <div class="relative flex h-full w-full items-center">
      {#each willAnswerQuestions as question, index (question.id)}
        <Motion
          let:motion
          style={{ transformOrigin: 'top center' }}
          animate={{
            top: index * -CARD_OFFSET,
            scale: 1 - index * SCALE_FACTOR,
            zIndex: willAnswerQuestions.length - index
          }}>
          <div
            use:motion
            class="bg-secondary-container border-primary/50 absolute flex h-full w-full flex-col rounded-2xl border px-4 py-8">
            <div class="h-fit w-full p-4">
              <h1 class="font-serif text-3xl font-semibold">
                {question.text}
              </h1>
            </div>
            <div
              class="flex h-full w-full flex-col space-y-4 overflow-y-auto p-4">
              {#each question.options as option}
                <label class="group w-full">
                  <input
                    type="radio"
                    name="choice"
                    value={option.id}
                    class="peer hidden"
                    checked={selectedChoice === option.id}
                    onchange={() => (selectedChoice = option.id)} />
                  <div
                    class="border-primary/20 peer-checked:bg-primary/20 peer-checked:ring-primary/20 peer-checked:border-primary/50 flex w-full items-center rounded-xl border px-4.5 py-6 text-sm transition-all ease-linear peer-checked:ring-4">
                    <CheckBox
                      class="border-primary/20 rounded-full p-3"
                      checked={selectedChoice === option.id}
                      id={option.id} />
                    <div class="flex pl-4 font-medium">
                      {option.label}
                    </div>
                  </div>
                </label>
              {/each}
            </div>
            <div class="h-12 w-full">{@render buttons()}</div>
          </div>
        </Motion>
      {/each}
    </div>
  </div>
</div>

{#snippet buttons()}
  <div in:fly={{ y: 80 }} class="flex w-full py-2">
    <div class="h-full w-1/2">
      <button
        onclick={skip}
        disabled={willAnswerQuestions.length === 1}
        type="reset"
        class="disabled:text-primary/50 flex h-full w-full items-center justify-center px-4.5 py-3.5 font-semibold">
        Skip
      </button>
    </div>
    <div class="h-full w-1/2">
      <button
        type="button"
        disabled={selectedChoice === null || submitting}
        onclick={next}
        class="border-none"
        >{willAnswerQuestions.length === 1 ? 'Finish' : 'Next'}</button>
    </div>
  </div>
{/snippet}
