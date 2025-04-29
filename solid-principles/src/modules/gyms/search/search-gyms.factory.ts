
import { PrismaGymsRepository } from "@@gyms/shared/repositories/prisma.gyms.repository"
import { SearchGymsService } from "./search-gyms.service"

export function makeSearchGymService() {
  const gymRepository = new PrismaGymsRepository()
  const searchGymsService = new SearchGymsService(gymRepository)

  return searchGymsService
}