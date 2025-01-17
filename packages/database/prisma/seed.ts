import { seedUsers } from './seed_users'
import { seedVotes } from './seed_votes'
import { prisma } from '../src'
import chalk from 'chalk'
import readline from 'node:readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question(
  chalk.cyan(
    `[1] Generate Users

Enter: `
  ),
  async (answer) => {
    switch (answer) {
      case '1':
        {
          rl.question(
            chalk.yellow('How many users to generate? '),
            async (n) => {
              console.clear()
              await seedUsers(Number(n))
                .catch((e) => console.error(chalk.red(e)))
                .finally(() => {
                  prisma.$disconnect()
                  rl.close()
                  console.log(chalk.yellow.bold('Done!\n'))
                  process.exit(0)
                })
            }
          )
        }

        break
      case '2':
        console.clear()
        await seedVotes()
          .catch((e) => console.error(chalk.red(e)))
          .finally(() => {
            prisma.$disconnect()
            rl.close()
            console.log(chalk.yellow.bold('Done!\n'))
            process.exit(0)
          })

        break
      case '3':
        console.log('Not implemented yet.')
        break
      case '4':
        console.log('Not implemented yet.')
        break
      case '5':
        console.log('Not implemented yet.')
        break
      case '6':
        console.log('Not implemented yet.')
        break
      default:
        console.log(chalk.red('Invalid input.'))
        break
    }
  }
)

rl.on('SIGINT', () => {
  console.log(chalk.red('\nSeed cancelled.'))
  rl.close()
  process.exit(0)
})
