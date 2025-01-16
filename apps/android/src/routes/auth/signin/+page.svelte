<script lang="ts">
  import { Facebook, Google } from '$lib/icons'
  import { navigating } from '$app/state'
  import { fly } from 'svelte/transition'
  import { signInWithOAuth, supabase } from '$lib/supabase'
  import { notify } from '$lib/store'
  import { Divider } from '$lib/components'
  import { goto, invalidate } from '$app/navigation'
  import type { BaseCycle } from '@training-needs/database'

  let email = $state('')
  let password = $state('')

  const gotoSignup = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/cycles/current`,
      {
        method: 'GET'
      }
    )

    const cycle = (await response.json()) as BaseCycle

    if (cycle) {
      notify('Sign up is disabled for now', 'error')
    } else {
      goto('/auth/signup')
    }
  }
</script>

<div
  in:fly={{ x: navigating.type === 'popstate' ? -1000 : 1000, delay: 200 }}
  out:fly={{ x: navigating.type === 'popstate' ? 1000 : -1000 }}
  class="flex h-full min-h-screen w-full items-center">
  <div class="mx-auto w-full max-w-lg space-y-4 px-12">
    <h1 class="pb-4 text-2xl font-bold">Sign in to Training Needs</h1>
    <div class="w-full space-y-5">
      <div class="w-full">
        <button
          type="button"
          onclick={() => {
            signInWithOAuth('google')
          }}
          class="text-on-surface bg-surface flex items-center justify-center space-x-4 text-sm font-semibold">
          <Google class="h-4.5 w-4.5" />
          <p>
            Si<span class="font-work text-[15px]">g</span>n in with Goo<span
              class="font-work text-[15px]">g</span
            >le
          </p>
        </button>
      </div>
      <button
        type="button"
        onclick={() => signInWithOAuth('facebook')}
        class="text-on-surface bg-surface flex items-center justify-center space-x-2 text-sm font-semibold">
        <Facebook class="h-5 w-9" />
        <p>Si<span class="font-work text-[15px]">g</span>n in with Facebook</p>
      </button>
      <Divider text="or sign in with email" />
    </div>
    <div class="w-full space-y-4">
      <div class="w-full">
        <label for="login" class="text-md block pb-1 font-bold">Email</label>
        <input
          type="email"
          autocomplete="email"
          bind:value={email}
          name="email"
          id="login"
          data-input="login" />
      </div>
      <div class="w-full">
        <label for="password" class="text-md block pb-1 font-bold"
          >Password</label>
        <input
          type="password"
          autocomplete="current-password"
          bind:value={password}
          name="password"
          id="password"
          data-input="login" />
      </div>
      <div class="w-full pt-4">
        <button
          disabled={!email || !password}
          type="button"
          onclick={async () => {
            if (
              !new RegExp(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              ).test(email)
            ) {
              notify('Please enter a valid email address', 'error')
              return
            }

            const { data } = await supabase.auth.signInWithPassword({
              email,
              password
            })

            if (data.session) {
              invalidate('supabase:auth')
            } else {
              notify('Invalid email or password', 'error')
            }
          }}
          class="disabled:bg-primary/50 border-none text-sm transition-colors duration-200"
          >Si<span class="font-work text-[15px]">g</span>n In</button>
      </div>
    </div>
    <div class="flex w-full justify-center text-sm">
      <p class="text-tertiary">Don&apos;t have an account?&nbsp;</p>
      <button onclick={gotoSignup} class="underline decoration-1"
        >Sign up</button>
    </div>
  </div>
</div>
