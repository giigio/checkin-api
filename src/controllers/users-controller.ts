import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UsersCreate } from '@/services/users-create'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists'

export async function usersController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  })

  const { name, email, password } = bodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const usersCreate = new UsersCreate(usersRepository)

    await usersCreate.execute({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
