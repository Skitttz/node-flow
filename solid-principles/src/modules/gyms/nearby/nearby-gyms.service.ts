import type { GymsRepository } from "@@gyms/shared/repositories/gym.repository.interface";
import type {
  NearbyGymsServiceRequest,
  NearbyGymsServiceResponse,
} from "./nearby-gyms.interface";

export class NearbyGymsService {
  constructor(private GymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: NearbyGymsServiceRequest): Promise<NearbyGymsServiceResponse> {
    const gyms = await this.GymsRepository.findNearByGyms({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return {
      gyms,
    };
  }
}
