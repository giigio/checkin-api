import { FastifyInstance } from 'fastify'
import { usersRoutes } from './users-routes'
import { sessionsRoutes } from './sessions-routes'

export default async function registerRoutes(app: FastifyInstance) {
  app.register(usersRoutes, { prefix: '/users' })
  app.register(sessionsRoutes, { prefix: '/sessions' })
}
