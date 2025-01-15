import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import type { BaseTrainingSeminar } from '@training-needs/database'

export const load: PageLoad = async ({ fetch, parent }) => {
  const { cycle, participation } = await parent()

  let titles: string[] = []

  if (cycle.period === 1) {
    if (participation.didPretest) {
      redirect(308, '/private/test/done')
    }

    titles = [
      'Ready to see how much you know before the seminar?',
      'Let’s test your knowledge before the big day!',
      'How prepared are you? Let’s find out!',
      'Time to challenge yourself before the seminar!',
      'Think you’ve got this? Let’s test it!',
      'Take the pre-test and see where you stand!',
      'Show us what you already know!',
      'Warm up your brain with the pre-test!',
      'Kickstart your seminar journey with a quick test!',
      'Let’s measure your knowledge before the seminar!'
    ]
  } else {
    if (participation.didPosttest) {
      redirect(308, '/private/test/done')
    }
    titles = [
      'Let’s see how much you’ve learned — time for the post-test!',
      'The seminar’s done — ready to showcase what you know?',
      'Time to check your progress — let’s start the post-test!',
      'Show us what you’ve learned — take the post-test now!',
      'You’ve gained so much knowledge — let’s put it to the test!',
      'Let’s see how far you’ve come — it’s post-test time!',
      'Reflect on your learning — time for the post-test!',
      'Prove your progress — start the post-test today!',
      'The seminar’s over — now it’s your turn to shine!',
      'You’ve learned a lot — now let’s measure your success!'
    ]
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/seminars/winner`
  )

  const winner = (await response.json()) as BaseTrainingSeminar

  return { winner, titles, period: cycle.period }
}
