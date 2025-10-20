import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from 'generated/prisma'

interface fetchNearbyGymsParams {
  userLatitude: number
  userLongitude: number
}

interface fetchNearbyGymsResponse {
  gyms: Gym[]
}

export class FetchNearbyCreateGymRegister {
  constructor(private fetchNearbyGymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: fetchNearbyGymsParams): Promise<fetchNearbyGymsResponse> {
    const gyms = await this.fetchNearbyGymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })
    return { gyms }
  }
}
