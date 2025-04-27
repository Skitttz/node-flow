import { GymsRepository } from '@@gyms/shared/repositories/gym.repository.interface';
import { NearbyGymsServiceRequest, NearbyGymsServiceResponse } from './nearby-gyms.interface';


export class NearbyGymsService{
  constructor(private GymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: NearbyGymsServiceRequest): Promise<NearbyGymsServiceResponse> {

    const gyms = await this.GymsRepository.findNearbyGyms({latitude: userLatitude, longitude: userLongitude});

    return {
      gyms
    }
  }
  
}