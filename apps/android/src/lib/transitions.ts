import { linear } from 'svelte/easing'

export const rotate = (
  _node: HTMLElement,
  { duration = 200, deg = 90 }: { duration?: number; deg?: number }
) => {
  return {
    duration,
    css: (t: number) => {
      const eased = linear(t)

      return `
        transform: rotate(${eased * deg}deg);`
    }
  }
}
