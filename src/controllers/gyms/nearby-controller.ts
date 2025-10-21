import { makeFetchNearbyGymsUseCase } from '@/services/factories/make-fetch-nearby-gyms-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function nearbyGymController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const querySchema = z.object({
    latitude: z.coerce.number().refine((val) => {
      return Math.abs(val) <= 90
    }),
    longitude: z.coerce.number().refine((val) => {
      return Math.abs(val) <= 180
    }),
  })

  const { latitude, longitude } = querySchema.parse(request.query)

  const gymsFetch = makeFetchNearbyGymsUseCase()

  const { gyms } = await gymsFetch.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({ gyms })
}
