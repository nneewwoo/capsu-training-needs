import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch, parent }) => {
  const { cycle, user } = await parent()

  let titlesLow: string[] = []
  let titlesMedium: string[] = []
  let titlesHigh: string[] = []

  if (cycle.period === 1) {
    titlesHigh = [
      'You’re on fire! Keep the momentum going at the seminar!',
      'Great work! The seminar will polish your knowledge even further!',
      "Amazing job! You're well-prepared for the seminar!",
      'Fantastic effort! The seminar will help you go even deeper!',
      'Excellent work! The seminar will fine-tune your expertise!'
    ]
    titlesMedium = [
      'Nice effort! The seminar will sharpen your skills!',
      'Good job! The seminar will boost your knowledge to the next level!',
      "Solid work! You'll master the material with help from the seminar!",
      'Great start! The seminar will build on what you’ve learned!',
      'Well done! The seminar will fill in the gaps and make you a pro!'
    ]
    titlesLow = [
      'Looks like there’s room for improvement! The seminar is here to help!',
      'Keep going! The seminar will set you on the right path!',
      'Don’t worry! The seminar is the perfect place to boost your skills!',
      'The seminar is your chance to learn and grow — don’t miss it!',
      'You’ve got the foundation — now let the seminar help you build on it!'
    ]
  } else {
    titlesHigh = [
      'Amazing! You’ve truly mastered the content!',
      'Great job! You’re at the top of your game!',
      'You crushed it! Your hard work paid off!',
      "Outstanding performance — you're a seminar star!",
      "Fantastic! You're more than ready for the real world!"
    ]
    titlesMedium = [
      'Solid work! You’re making real progress!',
      'Good job! You’ve got the basics down!',
      'Well done! Keep pushing for excellence!',
      'Great effort! You’re on the right track!',
      'Nice work! Just a bit more to reach mastery!'
    ]
    titlesLow = [
      'You’ve got room to grow — don’t stop now!',
      'Keep going! Every step is progress!',
      'You’re building a strong foundation — stay curious!',
      'Learning is a journey — keep at it!',
      'The seminar is just the start — practice makes perfect!'
    ]
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/seminars/questions/answer/score`,
    {
      method: 'POST',
      body: JSON.stringify({
        cycleId: cycle.id,
        userId: user.id,
        period: cycle.period
      })
    }
  )

  const { score, count } = (await response.json()) as {
    score: number
    count: number
  }

  return { score, count, titlesLow, titlesMedium, titlesHigh }
}
