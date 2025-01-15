<script lang="ts">
  import { fly } from 'svelte/transition'
  import { Motion } from 'svelte-motion'
  import { goto, invalidate } from '$app/navigation'
  import { CheckBox } from '$lib/components/index.js'
  import type { BaseFeedbackResponse } from '@training-needs/database'

  let countdown = $state('')

  const ratings = [
    {
      value: 'Poor',
      description:
        'The experience didn’t meet expectations. There’s room for a lot of improvement.'
    },
    {
      value: 'Fair',
      description:
        'The experience was okay, but there were several areas that could be better.'
    },
    {
      value: 'Good',
      description:
        'The experience was solid, but there’s still some room to make it great.'
    },
    {
      value: 'Better',
      description:
        'Things went well, but there are a few tweaks that could make it even better.'
    },
    {
      value: 'Best',
      description:
        'Everything was perfect! I couldn’t have asked for a better experience.'
    }
  ]

  let { data } = $props()

  let submitting = $state(false)

  let currentIndex = $state(0)

  let unansweredQuestions: typeof data.category.questions = $state(
    data.category.questions
  )
  let willAnswerQuestions: typeof data.category.questions = $state(
    data.category.questions.slice(0, 4)
  )
  let answeredQuestions: typeof data.category.questions = $state([])

  let responses: Partial<BaseFeedbackResponse>[] = $state([])

  let selectedChoice: string = $state('')

  const handleSubmit = async () => {
    submitting = true

    const respones = await data.fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/feedbacks/response`,
      {
        method: 'POST',
        body: JSON.stringify(responses)
      }
    )

    if (respones.ok) {
      const feedbackDone = JSON.parse(
        localStorage.getItem('feedback-done') || '[]'
      ) as string[]

      feedbackDone.push(data.category.id)
      localStorage.setItem('feedback-done', JSON.stringify(feedbackDone))

      goto('/private/feedback')
      submitting = false
    }
  }

  const next = () => {
    responses = [
      ...responses,
      {
        cycleId: data.cycle.id,
        userId: data.user.id,
        feedback: selectedChoice,
        feedbackQuestion: willAnswerQuestions[0].text,
        type: willAnswerQuestions[0].type
      }
    ]
    answeredQuestions = [
      ...answeredQuestions,
      {
        ...willAnswerQuestions[0]
      }
    ]
    if (currentIndex === data.category.questions.length - 1) {
      handleSubmit()
      return
    }

    if (willAnswerQuestions.length > 0) {
      unansweredQuestions = unansweredQuestions.slice(1)
      willAnswerQuestions = unansweredQuestions.slice(0, 4)

      currentIndex += 1

      selectedChoice = ''
      goto(`/private/feedback/questions?id=${data.category.id}`)
    }
  }

  const skip = () => {
    selectedChoice = ''
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
    const returnResponse = responses[responses.length - 1]
    selectedChoice = returnResponse.feedback || ''
    answeredQuestions = answeredQuestions.slice(0, -1)
    responses = responses.slice(0, -1)
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
  <title>{currentIndex + 1} of {data.category.questions.length}</title>
</svelte:head>

<div class="flex h-[calc(100vh_-_100px)] w-full flex-col">
  <div class="font-work w-full justify-center text-center text-xs font-medium">
    <div class="flex w-full justify-between">
      <p>{currentIndex + 1} of {data.category.questions.length}</p>
      <p>Ends at{countdown || '--:--:--'}</p>
    </div>
    <div class="bg-primary/20 h-2 w-full overflow-hidden rounded-full">
      <div
        style={`width: ${((currentIndex + 1) / data.category.questions.length) * 100}%;`}
        class={`bg-primary h-full transition-all duration-200`}>
      </div>
    </div>
  </div>
  <div class="h-full w-full pt-4 pb-12">
    <div class="relative flex h-full w-full items-center">
      {#each willAnswerQuestions as question, index (question.id)}
        <Motion
          let:motion
          style={{ transformOrigin: 'bottom center' }}
          animate={{
            bottom: index * -CARD_OFFSET,
            scale: 1 - index * SCALE_FACTOR,
            zIndex: willAnswerQuestions.length - index
          }}>
          <div
            use:motion
            class="bg-secondary-container border-primary/50 absolute flex h-full w-full flex-col rounded-2xl border px-4 py-8">
            <div class="h-fit w-full p-4">
              <p class="text-tertiary pb-1 text-xs">{data.category.title}</p>
              <h1 class="font-serif text-3xl font-semibold">
                {question.text}
              </h1>
            </div>
            {#if question.type === 'RATING'}
              {@render Rating()}
            {:else}
              <div class="h-full w-full">
                <textarea
                  class="border-primary/50 font-work placeholder:font-work h-full w-full resize-none placeholder:italic"
                  name="feedback-text"
                  placeholder="Type your feedback here..."
                  id={question.id}
                  bind:value={selectedChoice}></textarea>
              </div>
            {/if}
          </div>
        </Motion>
      {/each}
    </div>
  </div>
  <div class="h-12 w-full">{@render Buttons()}</div>
</div>

{#snippet Rating()}
  <div class="flex h-full w-full flex-col space-y-4 overflow-y-auto p-4">
    {#each ratings as rating, index}
      <label class="group w-full">
        <input
          type="radio"
          name="feedback-choice"
          value={rating.value}
          class="peer hidden"
          onchange={() => (selectedChoice = (index + 1).toString())} />
        <div
          class={`${selectedChoice === (index + 1).toString() ? 'bg-primary/20 ring-primary/20 border-primary/50 ring-4' : 'border-primary/20'} flex w-full items-center rounded-xl border px-4.5 py-6 text-sm transition-all ease-linear`}>
          {#if Number(selectedChoice) >= index + 1}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-6 w-6">
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clip-rule="evenodd" />
            </svg>
          {:else}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
          {/if}
          <div class="flex w-full flex-col">
            <div class="flex pl-4 font-serif text-lg font-medium">
              {rating.value}
            </div>

            <div class="text-tertiary flex pl-4">
              {rating.description}
            </div>
          </div>
        </div>
      </label>
    {/each}
  </div>
{/snippet}

{#snippet Buttons()}
  <div in:fly={{ y: 80 }} class="sticky bottom-0 left-0 flex w-full p-2">
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
        disabled={!selectedChoice || submitting}
        onclick={next}
        class="border-none"
        >{willAnswerQuestions.length === 1 ? 'Finish' : 'Next'}</button>
    </div>
  </div>
{/snippet}
