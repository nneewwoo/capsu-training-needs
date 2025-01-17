import { redirect } from '@sveltejs/kit'
import { prisma } from '@training-needs/database'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  const feedbacks = await prisma.baseFeedbackResponse.findMany({
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
    responses: feedbacks
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
        active: false
      }
    })
    redirect(308, '/')
  }
}
