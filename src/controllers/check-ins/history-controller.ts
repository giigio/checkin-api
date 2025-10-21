import { makeFetchUserCheckInsHistoryUseCase } from '@/services/factories/make-fetch-user-check-ins-history-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function historyCheckInController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const querySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = querySchema.parse(request.query)

  const historyFetch = makeFetchUserCheckInsHistoryUseCase()

  const { checkIns } = await historyFetch.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({ checkIns })
}
