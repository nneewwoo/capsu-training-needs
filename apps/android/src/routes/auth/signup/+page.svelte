<script lang="ts">
  import { BottomSheet, CheckBox } from '$lib/components'
  import { Facebook, Google, XMark } from '$lib/icons'
  import { navigating, page } from '$app/state'
  import { fly } from 'svelte/transition'
  import Divider from '$lib/components/Divider.svelte'
  import { signInWithOAuth, supabase } from '$lib/supabase'
  import { notify } from '$lib/store'

  let isSignupWithEmail: boolean = $state(false)
  let isLegalAgreementChecked: boolean = $state(false)

  let email: string = $state('')
  let full_name: string = $state('')
  let password: string = $state('')
</script>

<div
  in:fly={{ x: navigating.type === 'popstate' ? -1000 : 1000, delay: 200 }}
  out:fly={{ x: navigating.type === 'popstate' ? 1000 : -1000 }}
  class="flex h-full min-h-screen w-full items-center">
  <BottomSheet
    open={isSignupWithEmail}
    onclose={() => (isSignupWithEmail = false)}>
    <div class="h-full w-full space-y-4">
      <h1 class="pb-4 text-2xl font-bold">Sign up to Training Needs</h1>
      <div class="w-full space-y-5">
        <div class="w-full space-y-4">
          <div class="w-full">
            <label for="login" class="text-md block pb-1 font-bold"
              >Full Name</label>
            <input
              type="text"
              autocomplete="name"
              name="full_name"
              id="login"
              data-input="login"
              bind:value={full_name} />
          </div>
          <div class="w-full">
            <label for="login" class="text-md block pb-1 font-bold">
              Email
            </label>
            <input
              autocomplete="email"
              type="email"
              name="email"
              id="login"
              data-input="login"
              bind:value={email} />
          </div>
          <div class="w-full">
            <label for="password" class="text-md block pb-1 font-bold">
              Password
            </label>
            <input
              autocomplete="new-password"
              type="password"
              name="password"
              id="password"
              data-input="login"
              bind:value={password} />
          </div>
          <div class="flex w-full pt-4 text-xs">
            <CheckBox
              checked={isLegalAgreementChecked}
              onchange={() =>
                (isLegalAgreementChecked = !isLegalAgreementChecked)}
              id="legal-agreement" />
            <label for="legal-agreement" class="text-tertiary w-fit pl-2">
              I agree with Training Needs’
              <button
                role="link"
                class="text-on-surface text-wrap underline decoration-1">
                Terms of Service
              </button>
              and
              <button
                role="link"
                class="text-on-surface text-wrap underline decoration-1">
                Privacy Policy
              </button>
            </label>
          </div>
          <div class="w-full">
            <button
              type="button"
              onclick={async () => {
                await supabase.auth.signUp({
                  email,
                  password,
                  options: {
                    data: {
                      full_name
                    },
                    emailRedirectTo: `${import.meta.env.VITE_MAIN_DOMAIN_URL}/auth/verified`
                  }
                })
                notify(
                  'Please check your email to verify your account',
                  'success'
                )
                isSignupWithEmail = false
              }}
              disabled={!isLegalAgreementChecked ||
                !email ||
                !full_name ||
                !password}
              class="disabled:bg-primary/50 border-none text-sm transition-colors duration-200"
              >Si<span class="font-work text-[15px]">g</span>n Up</button>
          </div>
        </div>
      </div>
      <div class="w-full pt-4 text-center text-sm">
        <p class="text-tertiary">
          Already have an account?&nbsp;
          <button
            role="link"
            onclick={() => window.history.back()}
            class="text-on-surface underline decoration-1">
            Sign In
          </button>
        </p>
      </div>
    </div>
  </BottomSheet>
  <div class="mx-auto w-full max-w-lg space-y-4 px-12">
    <h1 class="pb-4 text-2xl font-bold">Sign up to Training Needs</h1>
    <div class="w-full space-y-5">
      <div class="w-full">
        <button
          type="button"
          onclick={() => signInWithOAuth('google')}
          class="flex items-center justify-center space-x-4 border-none text-sm font-semibold">
          <Google class="h-4.5 w-4.5" />
          <p>
            Si<span class="font-work text-[15px]">g</span>n up with Goo<span
              class="font-work text-[15px]">g</span
            >le
          </p>
        </button>
      </div>
      <button
        type="button"
        onclick={() => signInWithOAuth('facebook')}
        class="flex items-center justify-center space-x-2 border-none text-sm font-semibold">
        <Facebook class="h-5 w-9" />
        <p data-g>
          Si<span class="font-work text-[15px]">g</span>n up with Facebook
        </p>
      </button>
      <Divider text="or" />
    </div>
    <div class="w-full space-y-8">
      <div class="w-full">
        <button
          type="button"
          onclick={() => (isSignupWithEmail = true)}
          class="bg-surface text-on-surface border text-sm">
          Continue with email
        </button>
      </div>
    </div>
    <div class="w-full space-y-4 pt-8 text-center text-sm">
      <p class="text-tertiary text-xs">
        By creating an account you agree with our
        <button role="link" class="text-on-surface underline decoration-1"
          >Terms of Service</button>
        and our
        <button role="link" class="text-on-surface underline decoration-1"
          >Privacy Policy</button
        >.
      </p>
      <p class="text-tertiary">
        Already have an account?&nbsp;
        <button
          role="link"
          onclick={() => window.history.back()}
          class="text-on-surface underline decoration-1"
          >Sign In
        </button>
      </p>
    </div>
  </div>
</div>
