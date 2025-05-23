import { prisma } from "@@app/lib/prisma";
import type { CheckIn, Prisma } from "@prisma/client";
import dayjs from "dayjs";
import type { CheckInsRepository } from "./check-in.repository.interface";

export class PrismaCheckInRepository implements CheckInsRepository {
  async create({ user_id, gym_id }: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data: {
        user_id: user_id,
        gym_id: gym_id,
      },
    });
    return checkIn;
  }

  async save(targetCheckIn: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: targetCheckIn.id,
      },
      data: targetCheckIn,
    });

    return checkIn;
  }

  async findById(checkInId: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id: checkInId,
      },
    });
    return checkIn;
  }

  async findByUserIdOnDate(userID: string, date: Date) {
    const startOfDay = dayjs(date).startOf("date").toDate();
    const endOfDay = dayjs(date).endOf("date").toDate();

    const checkInSameDay = await prisma.checkIn.findFirst({
      where: {
        user_id: userID,
        created_at: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    return checkInSameDay;
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      skip: (page - 1) * 20,
      take: 20,
    });

    return checkIns;
  }

  async totalCheckInsByUserId(userId: string) {
    const countCheckIns = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });
    return countCheckIns;
  }
}
