import { prisma } from '../src/index'
import {
  randFirstName,
  randLastName,
  randUuid as uuidv4,
  randEmail
} from '@ngneat/falso'
import chalk from 'chalk'

export const seedUsers = async (n: number) => {
  for (let i = 0; i < n; i++) {
    const firstName = randFirstName({ withAccents: false })
    const lastName = randLastName({ withAccents: false })

    const newUser = await prisma.user.create({
      data: {
        id: uuidv4(),
        name: `${firstName} ${lastName}`,
        email: randEmail({
          firstName,
          lastName,
          provider: 'student.capsu',
          suffix: 'edu.ph'
        }),
        isDummy: true
      }
    })

    console.log(chalk.magenta(chalk.green(`++`), `${newUser.email}`))
  }
  console.log(chalk.yellow.bold(`\nGenerated ${n} users\n`))
}
