import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from 'generated/prisma'

interface searchGymsParams {
  query: string
  page: number
}

interface searchGymsResponse {
  gyms: Gym[]
}

export class SearchGymsRegister {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: searchGymsParams): Promise<searchGymsResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)
    return { gyms }
  }
}
