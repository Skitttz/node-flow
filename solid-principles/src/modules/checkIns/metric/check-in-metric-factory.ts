
import { PrismaCheckInRepository } from "@@checkIns/shared/repositories/prisma.check-ins.repository"
import { CheckInsMetricUserService } from "./check-in-metric.service"

export function makeCheckInMetricService() {
  const checkInRepository = new PrismaCheckInRepository()
  const checkInMetricService = new CheckInsMetricUserService(checkInRepository)

  return checkInMetricService
}