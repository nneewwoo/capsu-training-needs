import { fail } from '@sveltejs/kit'
import { prisma } from '@training-needs/database'
import type { Actions, PageServerLoad } from './$types'

export const actions: Actions = {
  'new-course': async ({ request }) => {
    const form = await request.formData()

    const title = form.get('title') as string

    if (!title) {
      return fail(403, { error: 'Cannot create a course without a title' })
    }

    const newCourse = await prisma.course.create({
      data: {
        title
      }
    })

    if (newCourse) {
      return {
        message: 'New course added successfully'
      }
    }
  }
}

export const load: PageServerLoad = async ({ depends }) => {
  const courses = await prisma.course.findMany()

  depends('prisma:courses')
  return {
    courses
  }
}
