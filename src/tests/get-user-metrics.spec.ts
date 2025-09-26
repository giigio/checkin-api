import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsService } from '@/services/get-user-metrics'
import { expect, describe, it, beforeEach } from 'vitest'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsService

describe('Get User Metrics Use Case', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsService(inMemoryCheckInsRepository)
  })

  it('should be able to get user check-in metrics', async () => {
    await inMemoryCheckInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    await inMemoryCheckInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })
    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
