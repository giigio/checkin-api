import { makeCreateGymUseCase } from '@/services/factories/make-create-gym-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function createGymController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((val) => Math.abs(val) <= 90, {
      message: 'Latitude must be between -90 and 90',
    }),
    longitude: z.number().refine((val) => Math.abs(val) <= 180, {
      message: 'Longitude must be between -180 and 180',
    }),
  })

  const { title, description, phone, latitude, longitude } = bodySchema.parse(
    request.body,
  )

  const gymsRegister = makeCreateGymUseCase()

  await gymsRegister.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  })

  return reply.status(201).send()
}
