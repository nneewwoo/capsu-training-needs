import { PrismaClient } from '@prisma/client'

export * from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var __prisma__: PrismaClient
}

const prisma = globalThis.__prisma__ ?? new PrismaClient()

export { prisma }
