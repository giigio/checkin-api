import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/middlewares/verify-jwt'

import { profileController } from '@/controllers/users/profile-controller'
import { authenticateController } from '@/controllers/users/authenticate-controller'
import { usersController } from '@/controllers/users/create-controller'
import { refreshController } from '@/controllers/users/refresh-controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', usersController)
  app.post('/sessions', authenticateController)
  app.patch('/token/refresh', refreshController)
  app.get('/profile', { onRequest: [verifyJWT] }, profileController)
}
