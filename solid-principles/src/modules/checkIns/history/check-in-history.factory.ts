import { PrismaCheckInRepository } from "@@checkIns/shared/repositories/prisma.check-ins.repository";
import { CheckInsHistoryService } from "./check-in-history.service";

export function makeCheckInHistoryService() {
  const checkInsRepository = new PrismaCheckInRepository();
  const checkInHistoryService = new CheckInsHistoryService(checkInsRepository);

  return checkInHistoryService;
}
