import { hash } from 'bcryptjs'
import { UsersRepositoryParams } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { User } from 'generated/prisma'

interface usersRegisterParams {
  name: string
  email: string
  password: string
}

interface registerUserResponse {
  user: User
}

export class UsersRegister {
  constructor(private usersRepository: UsersRepositoryParams) {}

  async execute({
    name,
    email,
    password,
  }: usersRegisterParams): Promise<registerUserResponse> {
    const password_hash = await hash(password, 6)
    const emailExists = await this.usersRepository.findByEmail(email)
    if (emailExists) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }
}
