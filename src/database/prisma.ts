import { PrismaClient } from 'generated/prisma'
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from '@/env'

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'development' ? ['query'] : ['error'],
}).$extends(withAccelerate())
