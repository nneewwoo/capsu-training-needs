<script lang="ts">
  import { Motion } from 'svelte-motion'

  let {
    colors = {
      first: '#9E7AFF',
      second: '#FE8BBB'
    },
    sparklesCount = 10,
    class: className = '',
    ...others
  } = $props()

  interface Sparkle {
    id: string
    x: string
    y: string
    color: string
    delay: number
    scale: number
    lifespan: number
  }

  let sparkles: Sparkle[] = $state([])

  let generateStar = () => {
    let starX = `${Math.random() * 100}%`
    let starY = `${Math.random() * 100}%`
    let color = Math.random() > 0.5 ? colors.first : colors.second
    let delay = Math.random() * 2
    let scale = Math.random() * 1 + 0.3
    let lifespan = Math.random() * 10 + 5
    let id = `${starX}-${starY}-${Date.now()}`
    return { id, x: starX, y: starY, color, delay, scale, lifespan }
  }

  let initializeStars = async () => {
    let newSparkles = Array.from({ length: sparklesCount }, generateStar)
    sparkles = newSparkles
  }

  const updateStars = () => {
    let temp = sparkles.map((star) => {
      if (star.lifespan <= 0) {
        return generateStar()
      } else {
        return { ...star, lifespan: star.lifespan - 0.1 }
      }
    })
    sparkles = temp
  }

  $effect(() => {
    initializeStars()
    const timeout = setInterval(updateStars, 100)

    return () => {
      clearInterval(timeout)
    }
  })
</script>

<div
  style:--sparkles-first-color="{colors.first};"
  style:--sparkles-second-color="{colors.second};"
  {...others}>
  {#each sparkles as item, _}
    {@render Sparkle(item)}
  {/each}
</div>

{#snippet Sparkle({ id, x, y, color, delay, scale }: Sparkle)}
  <Motion
    let:motion
    initial={{ opacity: 0, left: x, top: y }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, scale, 0],
      rotate: [75, 120, 150]
    }}
    transition={{ duration: 0.8, repeat: Infinity, delay }}>
    <svg
      use:motion
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 21 21"
      class="pointer-events-none absolute -top-12 z-20 h-[21px] w-[21px]">
      <path
        d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
        fill={color} />
    </svg>
  </Motion>
{/snippet}
