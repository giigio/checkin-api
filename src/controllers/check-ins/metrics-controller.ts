import { makeGetUserMetricsUseCase } from '@/services/factories/make-get-user-metrics'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function metricsCheckInController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const metricsFetch = makeGetUserMetricsUseCase()

  const { checkInsCount } = await metricsFetch.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({ checkInsCount })
}
