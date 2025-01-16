<script lang="ts">
  import { page } from '$app/state'
  import { fly } from 'svelte/transition'

  const unknownErrorTitles = [
    'Oops!',
    'Uh-oh!',
    'Yikes!',
    'Oh no!',
    'Something went wrong!'
  ]

  const internalErrorTitles = [
    'Internal glitch!',
    'Hold tight!',
    'Hmm...let’s try that again!',
    'A little hiccup!',
    'System error!'
  ]

  const unknownErrorDescriptions = [
    'Something went wrong. Let’s try that again.',
    'An unexpected hiccup. Hang tight while we sort this out.',
    'Something broke behind the scenes. Don’t worry, we’re on it!',
    'An unknown error occurred. Let’s give it another shot!',
    'Something went awry. We’re fixing it, stay with us!',
    'A mystery error. Let’s try again, shall we?'
  ]

  const internalErrorDescriptions = [
    'Looks like we hit a bump in the road. We’re on it!',
    'Something went awry on our side. Don’t worry, we’re fixing it!',
    'Our bad! We’re sorting out an internal issue — hang tight!',
    'A little glitch on our end. We’re getting it sorted, stay with us!',
    'Looks like our systems are having a moment. We’ll get back to you shortly!',
    'An internal issue popped up. Give us a sec to work through it!',
    'Oops! Something internal went wrong. Let’s try again in a bit!'
  ]
</script>

<div
  in:fly={{ x: 1000, delay: 200 }}
  out:fly={{ x: -1000 }}
  class="flex h-full min-h-screen w-full flex-col items-center justify-center px-8">
  <h1 class="pb-8 text-center font-serif text-5xl font-semibold">
    {page.error?.message.toLocaleLowerCase().includes('unknown')
      ? unknownErrorTitles[
          Math.floor(Math.random() * unknownErrorTitles.length)
        ]
      : page.error?.message.toLocaleLowerCase().includes('internal')
        ? internalErrorTitles[
            Math.floor(Math.random() * internalErrorTitles.length)
          ]
        : 'Zoinks!'}
  </h1>
  <p class="text-error text-center text-sm" data-g>
    {page.error?.message.toLocaleLowerCase().includes('unknown')
      ? unknownErrorDescriptions[
          Math.floor(Math.random() * unknownErrorDescriptions.length)
        ]
      : page.error?.message.toLocaleLowerCase().includes('internal')
        ? internalErrorDescriptions[
            Math.floor(Math.random() * internalErrorDescriptions.length)
          ]
        : page.error?.message}
  </p>
</div>
