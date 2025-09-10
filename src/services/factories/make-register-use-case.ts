import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UsersRegister } from '../users-register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const usersRegister = new UsersRegister(usersRepository)

  return usersRegister
}
