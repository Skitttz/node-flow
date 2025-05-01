import { HttpStatusCodeEnum } from "@@app/shared/constants";
import type { FastifyReply, FastifyRequest } from "fastify";
import { gymBodySchema } from "./gym.dto";
import { makeGymService } from "./gym.factory";

export async function gymController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { title, description, phone, latitude, longitude } =
    gymBodySchema.parse(request.body);
  const gymService = makeGymService();
  await gymService.execute({
    title,
    description,
    latitude,
    longitude,
    phone: phone ?? null,
  });
  return reply.status(HttpStatusCodeEnum.CREATED).send();
}
