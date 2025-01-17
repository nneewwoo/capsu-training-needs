import { shuffle } from './lib'
import { prisma } from '../src'
import chalk from 'chalk'

export const main = async () => {
  await prisma.baseCycle.deleteMany()

  const seminars = await prisma.trainingSeminar
    .findMany({
      include: { course: true, questions: { include: { options: true } } }
    })
    .then((s) => shuffle(s))

  await prisma.baseCycle.create({
    data: {
      period: 0,
      active: true,
      endDate: new Date(Date.now() + 1000 * 60 * 3),
      seminars: {
        create: seminars.map((s) => {
          console.log(
            `${chalk.white('Adding seminar:')} ${chalk.greenBright(s.title)}`
          )

          return {
            title: s.title,
            description: s.description,
            courseTitle: s.course.title,
            questions: {
              create: s.questions.map((q) => ({
                text: q.text,
                options: {
                  create: q.options.map((o) => ({
                    label: o.label,
                    isCorrect: o.isCorrect
                  }))
                }
              }))
            }
          }
        })
      }
    }
  })

  console.log(
    chalk.bold(
      `${chalk.green('\nSeed 0 done.')} ${chalk.yellow('Voting phase started.\n')}`
    )
  )
}

main()
  .catch((e) => {
    console.error(chalk.red(e))
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
