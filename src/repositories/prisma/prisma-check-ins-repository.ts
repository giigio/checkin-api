import { prisma } from '@/lib/prisma'
import { CheckInsRepository } from '../check-ins-repository'
import { CheckIn, Prisma } from 'generated/prisma'
import dayjs from 'dayjs'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async findById(id: string) {
    return await prisma.checkIn.findUnique({ where: { id } })
  }

  async findManyByUserId(userId: string, page: number) {
    return prisma.checkIn.findMany({
      where: { user_id: userId },
      take: 20,
      skip: (page - 1) * 20,
    })
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfDay = dayjs(date).startOf('date')
    const endOfDay = dayjs(date).endOf('date')

    return prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfDay.toDate(),
          lte: endOfDay.toDate(),
        },
      },
    })
  }

  async countByUserId(userId: string) {
    return prisma.checkIn.count({
      where: { user_id: userId },
    })
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    return prisma.checkIn.create({ data })
  }

  async save(data: CheckIn) {
    return prisma.checkIn.update({
      where: { id: data.id },
      data,
    })
  }
}
