import { PrismaGymsRepository } from "@@gyms/shared/repositories/prisma.gyms.repository";
import { NearbyGymsService } from "./nearby-gyms.service";

export function makeNearbyGymsService() {
  const gymsRepositoryymssRepository = new PrismaGymsRepository();
  const nearbyGymsService = new NearbyGymsService(gymsRepositoryymssRepository);

  return nearbyGymsService;
}
