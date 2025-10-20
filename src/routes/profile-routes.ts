import { FastifyInstance } from 'fastify'
import { profileController } from '@/controllers/profile-controller'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function profileRoutes(app: FastifyInstance) {
  app.get('/', { onRequest: [verifyJWT] }, profileController)
}
