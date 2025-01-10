<script lang="ts">
  import { BottomSheet, CheckBox } from '$lib/components'
  import { Facebook, Google, XMark } from '$lib/icons'

  let isSignupWithEmail: boolean = $state(false)
  let isLegalAgreementChecked: boolean = $state(false)

  let email: string = $state('')
  let full_name: string = $state('')

  const handleContinueWithEmail = () => {}
</script>

<div class="flex h-full w-full items-center">
  <BottomSheet
    open={isSignupWithEmail}
    onclose={() => (isSignupWithEmail = false)}>
    <div class="h-full w-full space-y-4">
      <h1 class="pb-4 text-2xl font-bold">Sign up to Training Needs</h1>
      <div class="w-full space-y-5">
        <div class="w-full space-y-8">
          <div class="w-full">
            <label for="login" class="text-md block pb-1 font-bold"
              >Full Name</label>
            <input
              type="email"
              name="email"
              id="login"
              data-input="login"
              bind:value={full_name} />
          </div>
          <div class="w-full">
            <label for="login" class="text-md block pb-1 font-bold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="login"
              data-input="login"
              bind:value={email} />
          </div>
          <div class="flex w-full text-xs">
            <CheckBox
              checked={isLegalAgreementChecked}
              onchange={() =>
                (isLegalAgreementChecked = !isLegalAgreementChecked)}
              id="legal-agreement" />
            <label for="legal-agreement" class="w-fit pl-2">
              I agree with Training Needs&apos;
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
              disabled={!isLegalAgreementChecked || !email || !full_name}
              class="disabled:bg-primary/50 border-none text-sm transition-colors duration-200"
              >Sign Up</button>
          </div>
        </div>
      </div>
      <div class="w-full pt-4 text-center text-sm">
        <p class="text-gray-500">
          Already have an account?&nbsp;
          <a href="/auth/signup" class="text-on-surface">Sign In</a>
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
          class="flex items-center justify-center space-x-4 border-none text-sm font-semibold">
          <Google class="h-4.5 w-4.5" />
          <p>Sign up with Google</p>
        </button>
      </div>
      <button
        type="button"
        class="flex items-center justify-center space-x-2 border-none text-sm font-semibold">
        <Facebook class="h-5 w-9" />
        <p>Sign up with Facebook</p>
      </button>
      <div class="flex w-full items-center">
        <div class="h-[1px] w-full bg-gray-200"></div>
        <p class="w-fit px-4 text-sm text-nowrap text-gray-500">or</p>
        <div class="h-[1px] w-full bg-gray-200"></div>
      </div>
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
      <p class="text-xs text-gray-500">
        By creating an account you agree with our
        <button role="link" class="text-on-surface underline decoration-1"
          >Terms of Service</button>
        and our
        <button role="link" class="text-on-surface underline decoration-1"
          >Privacy Policy</button
        >.
      </p>
      <p class="text-gray-500">
        Already have an account?&nbsp;
        <a href="/auth/signin" class="text-on-surface">Sign In</a>
      </p>
    </div>
  </div>
</div>
