import { makeCheckInUseCase } from '@/services/factories/make-check-in-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function createCheckInController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const checkInParamsSchema = z.object({
    gymId: z.uuid(),
  })

  const bodySchema = z.object({
    latitude: z.number().refine((val) => {
      return Math.abs(val) <= 90
    }),
    longitude: z.number().refine((val) => {
      return Math.abs(val) <= 180
    }),
  })

  const { gymId } = checkInParamsSchema.parse(request.params)
  const { latitude, longitude } = bodySchema.parse(request.body)

  const checkInsRegister = makeCheckInUseCase()

  await checkInsRegister.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send()
}
