<script lang="ts">
  import { enhance } from '$app/forms'
  import { invalidate } from '$app/navigation'
  import { notify } from '$lib/store'

  let { data, form } = $props()

  let courses = $state(data.courses)

  $effect(() => {
    if (form && form.error) {
      notify(form.error, 'error')
    } else if (form && form.message) {
      notify(form.message, 'success')
      invalidate('prisma:courses')
    }
  })
</script>

<div class="flex w-full">
  <div class="w-full flex-1 px-2 py-8">
    <div class="flex flex-col">
      <h3 class="pb-2 text-4xl font-bold">Courses</h3>
      <div class="bg-secondary-container w-full rounded-xl border p-2">
        <div class="flex w-full p-2 text-xs font-bold">
          <p>Title</p>
        </div>
        {#each courses as course}
          <div class="flex w-full border-t p-2 font-medium">
            <p>{course.title}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
  <aside class="w-1/3 px-2 py-8">
    <form method="POST" use:enhance class="w-full" action="?/new-course">
      <h5 class="text-lg font-bold">Add new course</h5>
      <div class=" h-fit w-full">
        <div class="flex h-full w-full flex-col">
          <input type="text" name="title" id="title" />
          <div class="flex w-full justify-end">
            <button type="submit" class="mt-4">Add</button>
          </div>
        </div>
      </div>
    </form>
  </aside>
</div>
