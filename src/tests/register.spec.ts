import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists'
import { UsersCreate } from '@/services/users-create'
import { compare } from 'bcryptjs'
import { expect, describe, it } from 'vitest'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new UsersCreate(inMemoryUsersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new UsersCreate(inMemoryUsersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new UsersCreate(inMemoryUsersRepository)

    const email = 'johndoe@mail.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
