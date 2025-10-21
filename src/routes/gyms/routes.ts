import { verifyJWT } from '@/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'

import { nearbyGymController } from '@/controllers/gyms/nearby-controller'
import { searchGymController } from '@/controllers/gyms/search-controller'
import { createGymController } from '@/controllers/gyms/create-controller'
import { verifyUserRole } from '@/middlewares/verify-user-role'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', searchGymController)
  app.get('/gyms/nearby', nearbyGymController)
  app.post(
    '/gyms',
    { onRequest: [verifyUserRole('ADMIN')] },
    createGymController,
  )
}
