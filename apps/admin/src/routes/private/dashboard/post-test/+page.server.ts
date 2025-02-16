import { prisma } from '@training-needs/database'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  const posttestResponses = await prisma.basePosttestResponse.findMany({
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
    responses: posttestResponses
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
        period: 4,
        endDate: new Date(date)
      }
    })
  }
}
