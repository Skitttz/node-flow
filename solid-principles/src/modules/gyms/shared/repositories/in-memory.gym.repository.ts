import { getDistanceBetweenCoordinates } from '@@app/shared/utils/get-distance-between-coordinates';
import { Gym, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { GymsRepository, NearbyGymsParams } from './gym.repository.interface';

export class inMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async create(data: Prisma.GymCreateInput) {
    const {id,title,description,latitude,longitude} = data;
    
    const gym = {
      id: id ?? randomUUID(),
      title,
      description,
      latitude: new Prisma.Decimal(latitude.toString()),
      longitude: new Prisma.Decimal(longitude.toString()),
      phone: "",
    }

    this.items.push(gym)

    return gym
  }

  async findNearByGyms(params: NearbyGymsParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )

      return distance < 10
    })
  }

  async searchManyGyms(searchTerm: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(searchTerm))
      .slice((page - 1) * 20, page * 20)
  }

  async findGymById(gymId:string) {
    const gym = this.items.find(item => item.id === gymId);
    if(!gym) return null;
    return gym;
  }
}
