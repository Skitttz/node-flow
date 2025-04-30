import { PrismaUserRepository } from "@@users/shared/repositories/prisma.user.repository";
import { AuthUserService } from "./auth.service";

export function makeAuthUserService() {
  const usersRepository = new PrismaUserRepository();
  const authUserService = new AuthUserService(usersRepository);

  return authUserService;
}
