import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { GetUserProfileService } from '@/services/get-user-profile'
import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileService(inMemoryUsersRepository)
  })
  it('should be able to authenticate', async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to get user profile with wrong userId', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
