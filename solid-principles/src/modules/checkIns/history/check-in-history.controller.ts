import { HttpStatusCodeEnum } from "@@app/shared/constants";
import type { FastifyReply, FastifyRequest } from "fastify";
import { checkInHistoryBodySchema } from "./check-in-history.dto";
import { makeCheckInHistoryService } from "./check-in-history.factory";

export async function checkInHistoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { page } = checkInHistoryBodySchema.parse(request.query);
  const checkInHistoryService = makeCheckInHistoryService();

  const { checkInsHistory } = await checkInHistoryService.execute({
    userID: request.user.sub,
    page,
  });

  return reply.status(HttpStatusCodeEnum.OK).send({
    checkInsHistory,
  });
}
