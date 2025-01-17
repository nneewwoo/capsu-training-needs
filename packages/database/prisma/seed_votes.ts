import { shuffle } from './lib'
import { prisma } from '../src'
import chalk from 'chalk'

export const seedVotes = async () => {
  const users = await prisma.user.findMany({
    where: { isDummy: true }
  })

  const seminars = await prisma.baseTrainingSeminar.findMany({
    where: { cycle: { active: true } }
  })

  for (const user of users) {
    const shuffledSeminars = shuffle(seminars).map((s, i) => ({
      ...s,
      rank: i + 1
    }))
    for (const seminar of shuffledSeminars) {
      await prisma.baseVote.create({
        data: {
          cycleId: seminar.cycleId,
          seminarId: seminar.id,
          userId: user.id,
          value: seminar.rank
        }
      })
    }

    const participation = await prisma.baseParticipation.findFirst({
      where: {
        userId: user.id,
        cycle: {
          active: true
        }
      }
    })

    await prisma.baseParticipation.update({
      where: {
        id: participation?.id
      },
      data: {
        didVote: true
      }
    })

    console.log(
      chalk.magenta(chalk.green(`++`), `${user.email}`, chalk.green(`done`))
    )
  }

  console.log(chalk.yellow.bold(`\nGenerated votes\n`))
}
