import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('Profile E2E Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
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

    const response = await request(app.server)
      .get('/profile')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.user).toEqual(
      expect.objectContaining({
        email: 'johndoe@mail.com',
      }),
    )
  })
})
