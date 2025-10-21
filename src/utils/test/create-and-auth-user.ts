import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthUser(app: FastifyInstance) {
  // Implementation for creating and authenticating a user for tests
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'johndoe@mail.com',
    password: '123456',
  })

  const session = await request(app.server).post('/sessions').send({
    email: 'johndoe@mail.com',
    password: '123456',
  })

  const { token } = session.body

  return { token }
}
