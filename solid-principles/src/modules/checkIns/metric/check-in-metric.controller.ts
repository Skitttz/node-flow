import { HttpStatusCodeEnum } from "@@app/shared/constants";
import type { FastifyReply, FastifyRequest } from "fastify";
import { makeCheckInMetricService } from "./check-in-metric.factory";

export async function checkInMetricController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const checkInMetricService = makeCheckInMetricService();

  const { checkInsCount } = await checkInMetricService.execute({
    userID: request.user.sub,
  });

  return reply.status(HttpStatusCodeEnum.OK).send({
    checkInsCount,
  });
}
