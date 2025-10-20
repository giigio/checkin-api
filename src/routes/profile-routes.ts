import { FastifyInstance } from 'fastify'
import { profileController } from '@/controllers/profile-controller'

export async function profileRoutes(app: FastifyInstance) {
  app.post('/', profileController)
}
