import { PrismaGymsRepository } from "../gyms/shared/repositories/prisma.gyms.repository";
import { CheckInService } from "./check-in.service";
import { PrismaCheckInRepository } from "./shared/repositories/prisma.check-ins.repository";

export function makeCheckInService() {
  const checkInsRepository = new PrismaCheckInRepository();
  const gymsRepository = new PrismaGymsRepository();
  const checkInService = new CheckInService(checkInsRepository, gymsRepository);

  return checkInService;
}
