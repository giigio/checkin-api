import { prisma } from '@/lib/prisma'
import { Prisma } from 'generated/prisma'
import { UsersRepositoryParams } from '../users-repository'

export class PrismaUsersRepository implements UsersRepositoryParams {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
