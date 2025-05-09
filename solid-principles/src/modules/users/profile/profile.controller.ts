import type { FastifyReply, FastifyRequest } from "fastify";
import { userStatusMessages } from "../constants";
import { UserResourceNotFound } from "../shared/errors/user-resource-not-found";
import { makeProfileUserService } from "./profile.factory";

export async function profileUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify();
    const profileUserService = makeProfileUserService();
    const profileUser = await profileUserService.execute({
      userId: request.user.sub,
    });
    const { id, password_hash, ...profileData } = profileUser.user;

    return reply
      .status(userStatusMessages.OK.statusCode)
      .send({ profile: { ...profileData } });
  } catch (err: unknown) {
    if (err instanceof UserResourceNotFound) {
      const { statusCode, message } = err;
      return reply.status(statusCode).send({ statusCode, message });
    }
    throw err;
  }
}
