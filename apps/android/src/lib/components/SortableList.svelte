<script lang="ts">
  import {
    dragHandle,
    dragHandleZone,
    type DndEvent,
    type Item
  } from 'svelte-dnd-action'
  import { flip } from 'svelte/animate'

  let { items, component, ondrop } = $props()

  const flipDurationMs = 200

  const onconsider = (event: CustomEvent<DndEvent<Item>>) => {
    items = event.detail.items
  }

  const onfinalize = (event: CustomEvent<DndEvent<Item>>) => {
    ondrop(event.detail.items)
  }
</script>

<div
  class="space-y-1"
  use:dragHandleZone={{ items, flipDurationMs, dropTargetStyle: {} }}
  {onconsider}
  {onfinalize}>
  {#each items as item (item.id)}
    <div class="relative" animate:flip={{ duration: flipDurationMs }}>
      <div class="absolute top-0 left-0 h-full w-1/4" use:dragHandle></div>
      {@render component(item)}
      <div class="absolute top-0 right-0 h-full w-1/4" use:dragHandle></div>
    </div>
  {/each}
</div>
