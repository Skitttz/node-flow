
import { PrismaUserRepository } from "@@users/shared/repositories/prisma.user.repository"
import { RegisterUsersService } from "./register.service"

export function makeRegisterUserService() {
  const usersRepository = new PrismaUserRepository()
  const registerUserService = new RegisterUsersService(usersRepository)

  return registerUserService
}