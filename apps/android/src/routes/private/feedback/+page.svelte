<script lang="ts">
  import { CheckBox } from '$lib/components/index.js'
  import { ChevronRight } from '$lib/icons'

  let { data } = $props()

  const titles = [
    'We’d Love to Hear Your Thoughts!',
    'Your Opinion Matters—Tell Us What You Think!',
    'Help Us Improve—Give Us Your Feedback!',
    'We’re All Ears! Share Your Seminar Experience!',
    'How Did We Do? Let Us Know!',
    'Your Feedback = Better Seminars! Share Yours!',
    'Tell Us What You Loved and What We Can Do Better!',
    'We Value Your Opinion—Let Us Know How We Can Improve!',
    'Help Us Grow! Share Your Thoughts on the Seminar!',
    'Rate Your Experience—We Want to Hear From You!'
  ]
</script>

<svelte:head>
  <title>Feedback</title>
</svelte:head>

<div class="h-fit w-full py-2">
  <div class="w-full pb-8">
    <h1 class="text-center font-serif text-2xl font-bold">
      {titles[Math.floor(Math.random() * titles.length)]}
    </h1>
  </div>
  <div class="bg-secondary-container w-full rounded-2xl py-4">
    {#each data.feedbacks as category}
      {#if data.feedbackDone.includes(category.id)}
        <div class="flex w-full px-8 py-4">
          <div class="flex w-full flex-col">
            <h3 class="font-serif text-xl font-bold opacity-50">
              {category.title}
            </h3>
            <p class="text-tertiary/50 text-sm">{category.description}</p>
          </div>
        </div>
      {:else}
        <a
          href={`/private/feedback/questions?id=${category.id}`}
          class="flex w-full px-8 py-4">
          <div class="flex w-full flex-col">
            <h3 class="font-serif text-xl font-bold">{category.title}</h3>
            <p class="text-tertiary text-sm">{category.description}</p>
          </div>
          <div class="flex items-center justify-center">
            <ChevronRight class="h-8 w-8" />
          </div>
        </a>
      {/if}
    {/each}
  </div>
</div>
