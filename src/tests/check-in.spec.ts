import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInService } from '@/services/checkin'
import { expect, describe, it } from 'vitest'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: CheckInService

describe('Register Use Case', () => {
  it('should be able to check in', async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInService(inMemoryCheckInsRepository)

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })
})
