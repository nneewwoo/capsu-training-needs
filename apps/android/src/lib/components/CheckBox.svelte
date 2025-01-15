<script lang="ts">
  let {
    id,
    class: className,
    onchange = $bindable(),
    checked = $bindable()
  }: {
    id: string
    class?: string
    onchange?: () => {}
    checked: boolean
  } = $props()
</script>

<div
  class="group relative flex h-4.5 w-4.5 shrink-0 items-center justify-center">
  <input
    type="checkbox"
    {id}
    bind:checked
    {onchange}
    class={`${className} text-primary peer checked:ring-primary/20 checked:bg-primary checked:border-primary/80 h-full w-full shrink-0 appearance-none rounded border bg-inherit p-0`} />
  <div
    class="group pointer-events-none absolute top-0 left-0 flex h-full w-full items-center justify-center">
    <svg
      class="text-on-primary hidden h-3 w-3 group-peer-checked:block"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  </div>
</div>
