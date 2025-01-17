import { prisma } from '@training-needs/database'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async () => {
  const courses = await prisma.course.findMany()

  return {
    courses
  }
}
