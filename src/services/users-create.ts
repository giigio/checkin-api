import { hash } from 'bcryptjs'
import { UsersRepositoryParams } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'

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
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
