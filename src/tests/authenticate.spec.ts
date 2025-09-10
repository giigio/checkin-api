import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from '@/services/authenticate'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { hash } from 'bcryptjs'
import { expect, describe, it } from 'vitest'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateService(inMemoryUsersRepository)

    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@mail.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateService(inMemoryUsersRepository)

    expect(() =>
      sut.execute({
        email: 'johndoe@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateService(inMemoryUsersRepository)

    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password_hash: await hash('123456', 6),
    })

    expect(() =>
      sut.execute({
        email: 'johndoe@mail.com',
        password: '123466',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
