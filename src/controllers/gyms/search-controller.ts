import { makeSearchGymsUseCase } from '@/services/factories/make-search-gyms-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function searchGymController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const querySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = querySchema.parse(request.query)

  const gymsSearch = makeSearchGymsUseCase()

  const { gyms } = await gymsSearch.execute({
    query,
    page,
  })

  return reply.status(200).send({ gyms })
}
