import { prisma } from "@@app/lib/prisma";
import type { Gym, Prisma } from "@prisma/client";
import type {
  GymsRepository,
  NearbyGymsParams,
} from "./gym.repository.interface";

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    });

    return gym;
  }

  async findNearByGyms({ latitude, longitude }: NearbyGymsParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
    SELECT * from gyms
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    return gyms;
  }

  async searchManyGyms(searchTerm: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: { contains: searchTerm },
      },
      take: 20,
      skip: (page - 1) * 20,
    });
    return gyms;
  }

  async findGymById(gymId: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id: gymId,
      },
    });

    return gym;
  }
}
