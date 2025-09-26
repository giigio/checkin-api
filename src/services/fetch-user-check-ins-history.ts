import { CheckIn } from 'generated/prisma'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface FetchUserRequest {
  userId: string
  page: number
}

interface FetchUserResponse {
  checkIns: CheckIn[]
}

export class FetchUserService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserRequest): Promise<FetchUserResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return { checkIns }
  }
}
