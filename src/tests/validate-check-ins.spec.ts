import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { LateCheckInValidationError } from '@/services/errors/late-check-in-validation-error'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { ValidateCheckInService } from '@/services/validate-check-in'

import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInService

describe('Check-in Use Case', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInService(inMemoryCheckInsRepository)
  })

  afterEach(() => {
    vi.useFakeTimers()
  })

  it('should be able to validate the check in', async () => {
    const createdCheckIn = await inMemoryCheckInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({ checkInId: createdCheckIn.id })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(inMemoryCheckInsRepository.items[0].validated_at).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to validate an inexistent check in', async () => {
    await expect(() =>
      sut.execute({ checkInId: 'inexistent-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckIn = await inMemoryCheckInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21
    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() =>
      sut.execute({ checkInId: createdCheckIn.id }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
