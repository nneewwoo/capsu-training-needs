<script lang="ts">
  import { enhance } from '$app/forms'
  import { goto } from '$app/navigation'
  import { page } from '$app/state'
  import { notify } from '$lib/store'
  import type { TrainingSeminar } from '@training-needs/database'
  import { Select } from 'bits-ui'
  import { CheckIcon, ChevronDownIcon } from 'lucide-svelte'
  import { slide } from 'svelte/transition'
  let { data, form } = $props()

  const courses = data.courses.map((course) => ({
    label: course.title,
    value: course.id
  }))

  let seminars = $state(data.seminars)

  const refreshSeminars = async () => {
    const response = await data.supabase
      .schema('reference')
      .from('training_seminars')
      .select('*')
      .eq('course_id', page.params.course_id)
    seminars = response.data as TrainingSeminar[]
  }

  $effect(() => {
    if (form && form.error) {
      notify(form.error, 'error')
    } else if (form && form.message) {
      notify(form.message, 'success')
      refreshSeminars()
    }
  })
</script>

<div class="flex w-full">
  <div class="w-full flex-1 px-2 py-8">
    <div class="flex flex-col">
      <h3 class="pb-2 text-4xl font-bold">Training Seminars</h3>
      <Select.Root
        onSelectedChange={async (selected) => {
          goto(`/private/training-seminars/${selected?.value}`, {
            invalidateAll: true,
            state: { course_id: selected?.value }
          })

          const response = await data.supabase
            .schema('reference')
            .from('training_seminars')
            .select('*')
            .eq('course_id', selected?.value)
          seminars = response.data as TrainingSeminar[]
        }}
        items={courses}>
        <Select.Trigger
          class="bg-surface text-on-surface flex w-1/2 justify-between rounded-xl px-4 py-2 text-start">
          <Select.Value placeholder={courses[0].label} />
          <ChevronDownIcon size="16" />
        </Select.Trigger>

        <Select.Content
          transition={slide}
          class="bg-surface text-on-surface w-1/2 rounded-xl border p-2">
          {#each courses as course}
            <Select.Item
              class="data-[highlighted]:bg-secondary-container/50 flex justify-between p-2"
              label={course.label}
              value={course.value}
              >{course.label}
              <Select.ItemIndicator>
                <CheckIcon size="16" />
              </Select.ItemIndicator>
            </Select.Item>
          {/each}
          <Select.Arrow />
        </Select.Content>
      </Select.Root>
      <div class="bg-secondary-container mt-2 w-full rounded-xl border p-2">
        <div class="flex w-full p-2 text-xs font-bold">
          <p class="w-1/3">Title</p>
          <p class="w-2/3">Description</p>
        </div>
        {#each seminars as seminar}
          <a
            href={`/private/training-seminars/${seminar.courseId}/${seminar.id}`}
            class="flex w-full border-t p-2 font-medium">
            <p class="w-1/3">{seminar.title}</p>
            <p class="w-2/3">{seminar.description}</p>
          </a>
        {/each}
      </div>
    </div>
  </div>
  <aside class="w-1/3 px-2 py-8">
    <form method="POST" use:enhance class="w-full" action="?/new-seminar">
      <h5 class="pb-2 text-lg font-bold">Add new seminar</h5>
      <div class=" h-fit w-full">
        <div class="flex h-full w-full flex-col">
          <label for="title" class="text-lg font-bold">Title</label>
          <input type="text" name="title" id="title" />
          <label for="description" class="pt-2 text-lg font-bold"
            >Description</label>
          <textarea name="description" id="description" class="h-52 resize-none"
          ></textarea>
          <div class="flex w-full justify-end">
            <button type="submit" class="mt-4">Add</button>
          </div>
        </div>
      </div>
    </form>
  </aside>
</div>
