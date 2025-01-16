<script>
  import GridPattern from '$lib/components/GridPattern.svelte'
  import { cn } from '$lib/utils'

  let { data } = $props()
</script>

<div class="h-fit w-full">
  <div
    class="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
    <div
      class="prose prose-h1:leading-5 prose-h1:text-on-surface prose-2xl w-full text-center font-sans">
      <h1 class="block text-4xl sm:text-5xl md:text-6xl lg:text-8xl">
        Your Choice,
      </h1>
      <h1 class="block text-4xl sm:text-5xl md:text-6xl lg:text-8xl">
        Your Experience
      </h1>
      <div class="font-work mx-auto mt-5 max-w-4xl text-center">
        <p
          class="text-tertiary font-[family-name:var(--font-geist-mono)] text-xl">
          Vote for the seminar topics that interest you most, and ensure the
          content aligns with your learning goals. Help us assess and meet your
          training needs.
        </p>
      </div>
      <div class="flex w-full justify-center">
        {@render Download()}
      </div>
    </div>
    <GridPattern
      width={80}
      height={80}
      fillColor="rgb(94 98 27 / 0.8)"
      strokeDashArray="4 4"
      class={cn(
        '[mask-image:radial-gradient(960px_circle_at_center,white,transparent)]'
      )}>
    </GridPattern>
  </div>
</div>

{#snippet Download()}
  <div
    class={cn(
      'group bg-background text-on-surface relative w-fit cursor-pointer overflow-hidden rounded-full border px-8 py-2 text-center text-lg font-semibold'
    )}>
    <a
      href={`https://github.com/nneewwoo/capsu-training-needs/releases/tag/${data.latestTag}`}
      ><span
        class="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        Download
      </span>
      <div
        class="text-surface absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-8 group-hover:opacity-100">
        <span>Download</span><svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="h-6 w-6">
          <path
            d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
          <path
            d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
        </svg>
      </div>
      <div
        class="bg-on-surface group-hover:bg-on-surface absolute top-[40%] left-[10%] h-2 w-2 scale-[1] rounded-lg transition-all duration-300 group-hover:top-[0%] group-hover:left-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8]">
      </div></a>
  </div>
{/snippet}
