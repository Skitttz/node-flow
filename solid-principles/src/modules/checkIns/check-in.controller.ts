import { HttpStatusCodeEnum } from "@@app/shared/constants";
import type { FastifyReply, FastifyRequest } from "fastify";
import { checkInBodySchema, checkInParamsBodySchema } from "./check-in.dto";
import { makeCheckInService } from "./check-in.factory";

export async function checkInController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { gymId } = checkInParamsBodySchema.parse(request.params);
  const { latitude, longitude } = checkInBodySchema.parse(request.body);

  const checkInService = makeCheckInService();
  await checkInService.execute({
    userId: request.user.sub,
    gymId,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(HttpStatusCodeEnum.CREATED).send();
}
