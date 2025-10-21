import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { profileController } from '@/controllers/users/profile-controller'
import { authenticateController } from '@/controllers/users/authenticate-controller'
import { usersController } from '@/controllers/users/create-controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', usersController)
  app.post('/sessions', authenticateController)
  app.get('/profile', { onRequest: [verifyJWT] }, profileController)
}
