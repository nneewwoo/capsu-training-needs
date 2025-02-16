import { fail, redirect } from '@sveltejs/kit'
import { prisma, type BaseTrainingSeminar } from '@training-needs/database'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  const seminars = await prisma.baseTrainingSeminar.findMany({
    where: {
      cycle: {
        active: true
      }
    }
  })

  interface RankedSeminarWithPosition extends BaseTrainingSeminar {
    position: number
  }

  const tiedSeminars: BaseTrainingSeminar[] = []

  const sort = seminars.sort((a, b) => a.rank - b.rank)

  let currentRank = 0
  let tieCount = 0
  let previousTotalRank: number | null = null

  const rankedWithPosition: RankedSeminarWithPosition[] = sort.map(
    (seminar, _index) => {
      if (seminar.rank !== previousTotalRank) {
        currentRank += 1 + tieCount
        tieCount = 0
      } else {
        tieCount++
        tiedSeminars.push(seminar)
      }

      previousTotalRank = seminar.rank

      return {
        ...seminar,
        position: currentRank
      }
    }
  )

  return {
    seminars: rankedWithPosition
  }
}

export const actions: Actions = {
  'change-period': async ({ request }) => {
    const seminars = await prisma.baseTrainingSeminar.findMany({
      where: {
        cycle: {
          active: true
        }
      },
      orderBy: {
        rank: 'asc'
      }
    })

    const form = await request.formData()

    const selectedWinner = form.get('winner') as string
    const date = form.get('date') as unknown as Date

    const tiedSeminars = seminars.filter(
      (seminar) => seminar.rank === seminars[0].rank
    )

    if (tiedSeminars.length > 1 && !selectedWinner) {
      return fail(403, { error: 'There are tied seminars', tiedSeminars })
    } else if (tiedSeminars.length > 1 && selectedWinner) {
      const _winner = await prisma.baseTrainingSeminar.update({
        where: {
          id: selectedWinner,
          cycle: {
            active: true
          }
        },
        data: {
          isWinner: true
        }
      })
    } else {
      const _winner = await prisma.baseTrainingSeminar.update({
        where: {
          id: seminars[0].id,
          cycle: {
            active: true
          }
        },
        data: {
          isWinner: true
        }
      })
    }
    await prisma.baseCycle.update({
      where: {
        active: true,
        id: seminars[0].cycleId
      },
      data: {
        period: 1,
        endDate: new Date(date)
      }
    })

    redirect(308, '/private/dashboard/pre-test')
  }
}
