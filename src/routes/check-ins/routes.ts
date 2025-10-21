import { createCheckInController } from '@/controllers/check-ins/create-controller'
import { historyCheckInController } from '@/controllers/check-ins/history-controller'
import { metricsCheckInController } from '@/controllers/check-ins/metrics-controller'
import { validateCheckInController } from '@/controllers/check-ins/validate-controller'
import { verifyJWT } from '@/middlewares/verify-jwt'
import { verifyUserRole } from '@/middlewares/verify-user-role'
import { FastifyInstance } from 'fastify'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.patch(
    '/check-ins/:id/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validateCheckInController,
  )
  app.post('/gyms/:gymId/check-ins', createCheckInController)
  app.get('/check-ins/history', historyCheckInController)
  app.get('/check-ins/metrics', metricsCheckInController)
}
