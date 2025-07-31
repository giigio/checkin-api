import { FastifyInstance } from 'fastify'
import { usersRoutes } from './users-routes'

export default async function registerRoutes(app: FastifyInstance) {
  app.register(usersRoutes, { prefix: '/users' })
}
