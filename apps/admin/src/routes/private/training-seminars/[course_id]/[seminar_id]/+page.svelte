<script lang="ts">
  import { enhance } from '$app/forms'
  import { page } from '$app/state'
  import { notify } from '$lib/store.js'
  import { Accordion } from 'bits-ui'
  import { slide } from 'svelte/transition'

  let { data, form } = $props()

  let seminar = $state(data.seminar)

  const refreshQuestions = async () => {
    const response = await data.supabase
      .schema('reference')
      .from('training_seminars')
      .select('*')
      .eq('seminar_id', page.params.seminar_id)
    seminar = response.data as unknown as typeof seminar
  }

  $effect(() => {
    if (form && form.error) {
      notify(form.error, 'error')
    } else if (form && form.message) {
      notify(form.message, 'success')

      refreshQuestions()
    }
  })
</script>

<div class="relative flex w-full">
  <div class="w-full flex-1 px-2 py-8">
    <div class="flex flex-col">
      <h3 class="pb-2 text-4xl font-bold">{seminar.title}</h3>
      <p class="pb-2 font-medium">{seminar.description}</p>
      <div class="bg-secondary-container w-full rounded-xl border p-2">
        <div class="flex w-full p-2 text-xs font-bold">
          <p>Questions</p>
        </div>
        <Accordion.Root multiple>
          {#each seminar.questions as question}
            <Accordion.Item
              value={question.id}
              class="w-full border-t p-2 font-medium">
              <Accordion.Header class="w-full">
                <Accordion.Trigger role="none" class="w-full" type="reset">
                  <p class="w-full text-start">
                    {question.text}
                  </p>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content transition={slide}>
                {#each question.options as option}
                  <p class="text-tertiary px-4 py-1">- {option.label}</p>
                {/each}
              </Accordion.Content>
            </Accordion.Item>
          {/each}</Accordion.Root>
      </div>
    </div>
  </div>

  <aside class="sticky top-0 right-0 h-fit w-1/3 px-2 py-8">
    <form method="POST" use:enhance class="w-full" action="?/new-question">
      <h5 class="pb-2 text-lg font-bold">Add new question</h5>
      <div class=" h-fit w-full">
        <div class="flex h-full w-full flex-col">
          <label for="question" class="text-lg font-bold">Question</label>
          <textarea class="h-24 resize-none" name="question" id="question"
          ></textarea>
          <label for="option1" class="pt-2 text-sm font-bold"
            >Option 1 (Correct)</label>
          <input class="py-2" type="text" name="option1" id="option1" />
          <label for="option2" class="pt-2 text-sm font-bold">Option 2</label>
          <input class="py-2" type="text" name="option2" id="option2" />
          <label for="option3" class="pt-2 text-sm font-bold">Option 3</label>
          <input class="py-2" type="text" name="option3" id="option3" />
          <div class="flex w-full justify-end">
            <button type="submit" class="mt-4">Add</button>
          </div>
        </div>
      </div>
    </form>
  </aside>
</div>
