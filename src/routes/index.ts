import { FastifyInstance } from 'fastify'
import { usersRoutes } from './users/routes'
import { gymsRoutes } from './gyms/routes'

export default async function registerRoutes(app: FastifyInstance) {
  app.register(usersRoutes)
  app.register(gymsRoutes)
}
