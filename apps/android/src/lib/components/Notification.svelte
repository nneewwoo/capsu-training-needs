<script lang="ts">
  import { notification } from '$lib/store'
</script>

{#key $notification.message}
  <div class="fixed top-0 left-0 w-full text-center text-xs">
    <p
      class={`${$notification.type === 'success' ? 'bg-success text-on-success' : $notification.type === 'error' ? 'bg-error text-on-error' : 'bg-info text-on-info'}`}>
      {$notification.message}
    </p>
  </div>
{/key}
