import { makeMakeValidateCheckInUseCase } from '@/services/factories/make-validate-check-in-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function validateCheckInController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const validateParamsSchema = z.object({
    checkInId: z.uuid(),
  })

  const { checkInId } = validateParamsSchema.parse(request.params)

  const checkInsValidate = makeMakeValidateCheckInUseCase()

  await checkInsValidate.execute({
    checkInId,
  })

  return reply.status(204).send()
}
