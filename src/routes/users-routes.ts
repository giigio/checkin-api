import { FastifyInstance } from 'fastify'
import { usersController } from '@/controllers/users-controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', usersController)
}
