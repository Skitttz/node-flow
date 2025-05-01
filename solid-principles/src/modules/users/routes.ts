import { verifyJWT } from "@@app/middleware/verify-jwt";
import { AppRoutesEnum } from "@@app/shared/routes";
import type { FastifyInstance } from "fastify";
import { authUserController } from "./auth/auth.controller";
import { refreshTokenUserController } from "./auth/refresh-token.controller";
import { profileUserController } from "./profile/profile.controller";
import { registerUserController } from "./register/register.controller";

export async function userRoutes(app: FastifyInstance) {
  app.post(AppRoutesEnum.USER, registerUserController);
  app.post(AppRoutesEnum.SESSION, authUserController);
  app.patch(AppRoutesEnum.REFRESH_TOKEN, refreshTokenUserController)
  app.get(
    AppRoutesEnum.PROFILE,
    { onRequest: [verifyJWT] },
    profileUserController,
  );
}
