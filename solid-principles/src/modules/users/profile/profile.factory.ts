import { PrismaUserRepository } from "@@users/shared/repositories/prisma.user.repository";
import { ProfileUserService } from "./profile.service";

export function makeProfileUserService() {
  const usersRepository = new PrismaUserRepository();
  const profileUserService = new ProfileUserService(usersRepository);

  return profileUserService;
}
