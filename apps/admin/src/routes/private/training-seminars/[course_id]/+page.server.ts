import { prisma } from '@training-needs/database'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, url, depends }) => {
  const { course_id } = params

  depends(url.pathname)
  const seminars = await prisma.trainingSeminar.findMany({
    where: {
      courseId: course_id
    }
  })

  return {
    seminars
  }
}

export const actions: Actions = {
  'new-seminar': async ({ request, params }) => {
    const form = await request.formData()

    const { course_id } = params

    const title = form.get('title') as string
    const description = form.get('description') as string

    if (!title || !description) {
      return {
        status: 403,
        error: 'Please fill out all required fields'
      }
    }

    const newSeminar = await prisma.trainingSeminar.create({
      data: {
        title,
        courseId: course_id,
        description
      }
    })

    if (newSeminar) {
      return {
        message: 'New seminar added successfully'
      }
    }
  }
}
