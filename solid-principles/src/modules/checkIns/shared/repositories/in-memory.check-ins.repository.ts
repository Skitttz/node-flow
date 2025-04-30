import { randomUUID } from "node:crypto";
import type { CheckIn, Prisma } from "@prisma/client";
import dayjs from "dayjs";
import type { CheckInsRepository } from "./check-in.repository.interface";

export class inMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  async create({
    user_id,
    gym_id,
    validated_at,
  }: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id,
      gym_id,
      validated_at: validated_at ? new Date(validated_at) : null,
      created_at: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id);

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn;
    }

    return checkIn;
  }

  async findByUserIdOnDate(userID: string, date: Date) {
    const startOfDay = dayjs(date).startOf("date");
    const endOfDay = dayjs(date).endOf("date");

    const checkInSameDay = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isSameDate =
        checkInDate.isAfter(startOfDay) && checkInDate.isBefore(endOfDay);

      return checkIn.user_id === userID && isSameDate;
    });

    if (!checkInSameDay) return null;

    return checkInSameDay;
  }

  async findById(checkInId: string) {
    const checkIn = this.items.find((item) => item.id === checkInId);

    if (!checkIn) {
      return null;
    }

    return checkIn;
  }

  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20);
  }

  async totalCheckInsByUserId(userId: string) {
    return this.items.filter((checkIn) => checkIn.user_id === userId).length;
  }
}
