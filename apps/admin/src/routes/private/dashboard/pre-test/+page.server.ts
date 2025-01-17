import { prisma } from '@training-needs/database'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  const pretestResponses = await prisma.basePretestResponse.findMany({
    where: {
      cycle: {
        active: true
      }
    },
    include: {
      user: true
    }
  })

  return {
    responses: pretestResponses
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
        period: 2,
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 72)
      }
    })
  }
}
