import { redirect } from '@sveltejs/kit'
import { prisma } from '@training-needs/database'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  const users = await prisma.baseParticipation.findMany({
    where: {
      cycle: {
        active: true
      },
      didPretest: true,
      didVote: true,
      didAttend: false
    },
    include: {
      user: true
    }
  })

  return {
    users
  }
}

export const actions: Actions = {
  'change-period': async ({ request }) => {
    const form = await request.formData()

    const cycleId = form.get('cycleId') as string
    const date = form.get('date') as unknown as Date

    await prisma.baseCycle.update({
      where: {
        active: true,
        id: cycleId
      },
      data: {
        period: 3,
        endDate: new Date(date)
      }
    })

    redirect(308, '/private/dashboard/post-test')
  },
  'set-attended': async ({ request }) => {
    const form = await request.formData()

    const userId = form.get('userId') as string

    const participation = await prisma.baseParticipation.findFirst({
      where: {
        userId,
        cycle: {
          active: true
        }
      }
    })

    await prisma.baseParticipation.update({
      where: {
        id: participation?.id,
        userId
      },
      data: {
        didAttend: true
      }
    })

    return { message: 'User updated', userId }
  }
}
