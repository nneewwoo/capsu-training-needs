import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      animation: {
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear'
      },
      keyframes: {
        'shine-pulse': {
          '0%': {
            'background-position': '0% 0%'
          },
          '50%': {
            'background-position': '100% 100%'
          },
          to: {
            'background-position': '0% 0%'
          }
        }
      }
    }
  },

  plugins: [typography()]
} satisfies Config
