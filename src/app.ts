import fastify from 'fastify'
import registerRoutes from '@/routes'

export const app = fastify()
app.register(registerRoutes)
