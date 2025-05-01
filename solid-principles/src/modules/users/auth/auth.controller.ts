import { HttpStatusCodeEnum } from "@@app/shared/constants";
import type { FastifyReply, FastifyRequest } from "fastify";
import { UserInvalidCredentials } from "../shared/errors/user-invalid-credentials";
import { makeAuthUserService } from "./auth.factory";
import { authUserBodySchema } from "./auth.schema";

export async function authUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email, password } = authUserBodySchema.parse(request.body);

  try {
    const authUserService = makeAuthUserService();
    const { user } = await authUserService.execute({ email, password });
    const token = await reply.jwtSign(
      {
        role: user.role
      },
      {
        sign: {
          sub: user.id,
        },
      },
    );

    const refreshToken = await reply.jwtSign(
      {
        role: user.role
      },
      {
        sign: {
          sub: user.id,
          expiresIn:'7d',
        },
      },
    );
    return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure:true,
      sameSite: true,
      httpOnly: true,
    })
    .status(HttpStatusCodeEnum.OK)
    .send({ token });
  } catch (err: unknown) {
    if (err instanceof UserInvalidCredentials) {
      const { statusCode, message } = err;
      return reply.status(statusCode).send({ statusCode, message });
    }
    throw err;
  }
}
