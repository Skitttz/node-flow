import { HttpStatusCodeEnum } from "@@app/shared/constants";
import type { FastifyReply, FastifyRequest } from "fastify";
import { searchGymQuerySchema } from "./search-gyms.dto";
import { makeSearchGymService } from "./search-gyms.factory";

export async function searchGymController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { searchTerm, page } = searchGymQuerySchema.parse(request.query);
  const gymService = makeSearchGymService();
  const { gyms } = await gymService.execute({
    searchTerm,
    page,
  });
  return reply.status(HttpStatusCodeEnum.OK).send({
    gyms,
  });
}
