<script lang="ts">
  import { Facebook, Google } from '$lib/icons'
</script>

<div class="flex h-full w-full items-center">
  <div class="mx-auto w-full max-w-lg space-y-4 px-12">
    <h1 class="pb-4 text-2xl font-bold">Sign in to Training Needs</h1>
    <div class="w-full space-y-5">
      <div class="w-full">
        <button
          type="button"
          class="text-on-surface bg-surface flex items-center justify-center space-x-4 text-sm font-semibold">
          <Google class="h-4.5 w-4.5" />
          <p>Sign in with Google</p>
        </button>
      </div>
      <button
        type="button"
        class="text-on-surface bg-surface flex items-center justify-center space-x-2 text-sm font-semibold">
        <Facebook class="h-5 w-9" />
        <p>Sign in with Facebook</p>
      </button>
      <div class="flex w-full items-center">
        <div class="h-[1px] w-full bg-gray-200"></div>
        <p class="w-fit px-4 text-sm text-nowrap text-gray-500">
          or sign in with email
        </p>
        <div class="h-[1px] w-full bg-gray-200"></div>
      </div>
    </div>
    <div class="w-full space-y-8">
      <div class="w-full">
        <label for="login" class="text-md block pb-1 font-bold">Email</label>
        <input type="email" name="email" id="login" data-input="login" />
      </div>
      <div class="w-full">
        <button type="button" class="border-none text-sm">Sign In</button>
      </div>
    </div>
    <div class="flex w-full justify-center text-sm">
      <p class="text-gray-500">Don&apos;t have an account?&nbsp;</p>
      <a href="/auth/signup">Sign up</a>
    </div>
  </div>
</div>
