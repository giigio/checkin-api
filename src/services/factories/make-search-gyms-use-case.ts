import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchCreateGymRegister } from '../search-gyms'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchCreateGymRegister(gymsRepository)
  return useCase
}
