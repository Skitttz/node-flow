import { AppRoutesEnum } from "@@app/shared/routes";
import { FastifyInstance } from "fastify";
import { authUserController } from "./auth/auth.controller";
import { registerUserController } from "./register/register.controller";

export async function userRoutes(app: FastifyInstance){
  app.post(AppRoutesEnum.USER, registerUserController)
  app.post(AppRoutesEnum.SESSION, authUserController)
}