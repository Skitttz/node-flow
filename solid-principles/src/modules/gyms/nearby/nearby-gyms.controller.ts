import { HttpStatusCodeEnum } from "@@app/shared/constants";
import type { FastifyReply, FastifyRequest } from "fastify";
import { nearbyGymsQuerySchema } from "./nearby-gyms.dto";
import { makeNearbyGymsService } from "./nearby-gyms.factory";

export async function nearbyGymController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { userLatitude, userLongitude } = nearbyGymsQuerySchema.parse(
    request.query,
  );

  const gymService = makeNearbyGymsService();

  const { gyms } = await gymService.execute({
    userLatitude,
    userLongitude,
  });

  return reply.status(HttpStatusCodeEnum.OK).send({
    gyms,
  });
}
