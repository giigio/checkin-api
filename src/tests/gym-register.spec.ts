import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymRegister } from '@/services/gyms-register'
import { expect, describe, it } from 'vitest'

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: CreateGymRegister

describe('Gyms Register Use Case', () => {
  it('should be able to register new gym', async () => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymRegister(inMemoryGymsRepository)

    const { gym } = await sut.execute({
      title: 'Test Gym',
      description: 'Test Description',
      phone: '1234567890',
      latitude: 40.7128,
      longitude: -74.006,
    })
    expect(gym.id).toEqual(expect.any(String))
  })
})
