<script lang="ts">
  let { text, color }: { text?: string; color?: string } = $props()
</script>

<div class="relative flex h-8 w-full items-center">
  <div class="absolute top-0 left-0 flex h-full w-full items-center">
    <div class={`h-[1px] w-full ${color ? `bg-${color}` : 'bg-gray-200'}`}>
    </div>
  </div>
  {#if text}
    <div
      class="absolute top-0 left-0 flex h-full w-full items-center justify-center">
      <p class="bg-surface text-tertiary px-4 text-sm">
        {text}
      </p>
    </div>
  {/if}
</div>
