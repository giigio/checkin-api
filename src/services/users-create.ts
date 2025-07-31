import { hash } from 'bcryptjs'
import { UsersRepositoryParams } from '@/repositories/users-repository'

interface usersCreateParams {
  name: string
  email: string
  password: string
}

export class UsersCreate {
  constructor(private usersRepository: UsersRepositoryParams) {}

  async execute({ name, email, password }: usersCreateParams) {
    const password_hash = await hash(password, 6)
    const emailExists = await this.usersRepository.findByEmail(email)
    if (emailExists) {
      throw new Error('Email already exists')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
