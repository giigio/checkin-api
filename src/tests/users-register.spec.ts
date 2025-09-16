import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists'
import { UsersRegister } from '@/services/users-register'
import { compare } from 'bcryptjs'
import { expect, describe, it } from 'vitest'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: UsersRegister

describe('Users Register Use Case', () => {
  it('should be able to register', async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new UsersRegister(inMemoryUsersRepository)

    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new UsersRegister(inMemoryUsersRepository)

    const { user } = await sut.execute({
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
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new UsersRegister(inMemoryUsersRepository)

    const email = 'johndoe@mail.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
