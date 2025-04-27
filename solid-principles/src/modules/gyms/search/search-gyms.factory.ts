
import { PrismaGymsRepository } from "@@gyms/shared/repositories/prisma.gyms.repository"
import { SearchGymsService } from "./search-gyms.service"

export function makeSearchCheckInService() {
  const checkInsRepository = new PrismaGymsRepository()
  const searchCheckInService = new SearchGymsService(checkInsRepository)

  return searchCheckInService
}