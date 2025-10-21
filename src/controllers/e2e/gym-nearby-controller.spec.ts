import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { createAndAuthUser } from '@/utils/test/create-and-auth-user'

describe('Nearby Gym E2E Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: `Nearby Gym`,
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: `Faraway Gym`,
        description: null,
        phone: null,
        latitude: -27.0618928,
        longitude: -49.5229501,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({ latitude: -27.2092052, longitude: -49.6401091 })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: 'Nearby Gym' }),
    ])
  })
})
