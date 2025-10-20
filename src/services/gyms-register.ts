import { GymsRepository } from '@/repositories/gyms-repository'
import { randomUUID } from 'crypto'
import { Gym } from 'generated/prisma'

interface gymsRegisterParams {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface registerGymResponse {
  gym: Gym
}

export class CreateGymRegister {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: gymsRegisterParams): Promise<registerGymResponse> {
    const gym = await this.gymsRepository.create({
      id: randomUUID(),
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}
