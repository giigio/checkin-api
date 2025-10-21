import { makeFetchNearbyGymsUseCase } from '@/services/factories/make-fetch-nearby-gyms-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function nearbyGymController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const querySchema = z.object({
    latitude: z.number().refine((val) => Math.abs(val) <= 90, {
      message: 'Latitude must be between -90 and 90',
    }),
    longitude: z.number().refine((val) => Math.abs(val) <= 180, {
      message: 'Longitude must be between -180 and 180',
    }),
  })

  const { latitude, longitude } = querySchema.parse(request.query)

  const gymsFetch = makeFetchNearbyGymsUseCase()

  await gymsFetch.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send()
}
