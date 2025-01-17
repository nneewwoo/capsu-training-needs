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

    await prisma.baseCycle.update({
      where: {
        active: true,
        id: cycleId
      },
      data: {
        period: 3,
        endDate: new Date(Date.now() + 1000 * 60 * 30)
      }
    })

    redirect(308, '/private/dashboard/post-test')
  },
  'set-attended': async ({ request }) => {
    const form = await request.formData()

    const userId = form.get('userId') as string

    await prisma.baseParticipation.update({
      where: {
        cycle: {
          active: true
        },
        userId
      },
      data: {
        didAttend: true
      }
    })

    return { message: 'User updated', userId }
  }
}
