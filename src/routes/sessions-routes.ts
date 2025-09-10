import { FastifyInstance } from 'fastify'
import { authenticateController } from '@/controllers/authenticate'

export async function sessionsRoutes(app: FastifyInstance) {
  app.post('/', authenticateController)
}
