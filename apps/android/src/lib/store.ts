import { writable } from 'svelte/store'

interface Notification {
  message: string
  type: 'success' | 'error' | null
}

export const notification = writable<Notification>({ message: '', type: null })

export const notify = (
  message: Notification['message'],
  type: Notification['type']
) => {
  notification.set({ message, type })

  setTimeout(() => {
    notification.set({
      message: '',
      type: null
    })
  }, 3000)
}
