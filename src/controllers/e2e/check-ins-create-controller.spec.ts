import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { createAndAuthUser } from '@/utils/test/create-and-auth-user'

describe('Create Check-In E2E Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Gym',
        description: 'Some description about Test Gym',
        phone: '11999999999',
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

    const gymId = await request(app.server)
      .get('/gyms/search')
      .query({ query: 'Test Gym' })
      .set('Authorization', `Bearer ${token}`)
      .send()

    const response = await request(app.server)
      .post(`/gyms/${gymId.body.gyms[0].id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

    expect(response.statusCode).toEqual(201)
  })
})
