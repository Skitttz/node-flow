import type { Gym, Prisma } from "@prisma/client";

interface NearbyGymsParams {
  latitude: number
  longitude: number
}

interface GymsRepository {
  create(data:Prisma.GymCreateInput): Promise<Gym>
  findGymById(gymId:string): Promise<Gym | null>
  findNearByGyms(params: NearbyGymsParams): Promise<Gym[]>
  searchManyGyms(searchTerm: string, page: number): Promise<Gym[]>
}

export type { GymsRepository, NearbyGymsParams };

