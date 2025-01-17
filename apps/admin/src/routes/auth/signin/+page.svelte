<script lang="ts">
  import { enhance } from '$app/forms'
  import { notify } from '$lib/store'

  let { form } = $props()

  $effect(() => {
    if (form?.error) {
      notify(form?.error, 'error')
    } else {
      notify(form?.message, 'success')
    }
  })
</script>

<svelte:head>
  <title>Sign In | Admin - CAPSU Training Needs</title>
</svelte:head>

<form
  use:enhance
  method="POST"
  novalidate
  class="flex h-full min-h-screen w-full items-center">
  <div class="mx-auto w-full max-w-lg space-y-4 px-12">
    <img src="/logo.png" alt="logo" class="h-24 w-24" />
    <h1 class="pb-4 text-2xl font-bold">Sign in to Training Needs</h1>
    <div class="w-full space-y-4">
      <div class="w-full">
        <label for="email" class="text-md block pb-1 font-bold">Email</label>
        <input type="email" autocomplete="email" name="email" id="email" />
      </div>
      <div class="w-full pt-4">
        <button
          type="submit"
          class="disabled:bg-primary/50 border-none text-sm transition-colors duration-200"
          >Send si<span class="font-work text-[15px]">g</span>n in link</button>
      </div>
    </div>
  </div>
</form>
