import { FastifyInstance } from 'fastify'
import { authenticateController } from '@/controllers/authenticate-controller'

export async function sessionsRoutes(app: FastifyInstance) {
  app.post('/', authenticateController)
}
