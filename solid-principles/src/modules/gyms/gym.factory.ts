
import { PrismaGymsRepository } from "../gyms/shared/repositories/prisma.gyms.repository"
import { GymService } from "./gym.service"

export function makeGymService() {
  const gymsRepository = new PrismaGymsRepository()
  const gymService = new GymService(gymsRepository)

  return gymService
}