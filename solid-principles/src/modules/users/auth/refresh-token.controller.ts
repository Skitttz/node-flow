import { HttpStatusCodeEnum } from "@@app/shared/constants";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function refreshTokenUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify({onlyCookie: true})

  const {role,sub} = request.user;
  console.log("role:::",role)

  const token = await reply.jwtSign(
      {role},
      {
        sign: {
          sub,
        },
      },
    );

    const refreshToken = await reply.jwtSign(
      {role},
      {
        sign: {
          sub,
          expiresIn:'7d',
        },
      },
    );

    
    return reply.setCookie('refreshToken', refreshToken, {
      path: '/',
      secure:true,
      sameSite: true,
      httpOnly: true,
    })
    .status(HttpStatusCodeEnum.OK)
    .send({ token });
    
}
