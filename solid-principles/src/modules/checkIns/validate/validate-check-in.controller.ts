import { HttpStatusCodeEnum } from "@@app/shared/constants";
import type { FastifyReply, FastifyRequest } from "fastify";
import { validateCheckInParamsSchema } from "./validate-check-in.dto";
import { makeCheckInValidateService } from "./validate-check-in.factory";

export async function checkInValidateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { checkInId } = validateCheckInParamsSchema.parse(request.params);

  const checkInValidateService = makeCheckInValidateService();
  await checkInValidateService.execute({
    checkInId: checkInId,
  });
  return reply.status(HttpStatusCodeEnum.NO_CONTENT).send();
}
