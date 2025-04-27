
import { PrismaCheckInRepository } from "@@checkIns/shared/repositories/prisma.check-ins.repository"
import { ValidateCheckInService } from "./validate-check-in.service"

export function makeCheckInValidateService() {
  const checkInsRepository = new PrismaCheckInRepository()
  const checkInValidateService = new ValidateCheckInService(checkInsRepository)

  return checkInValidateService
}