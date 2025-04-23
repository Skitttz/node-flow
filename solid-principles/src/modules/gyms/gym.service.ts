import { GymServiceRequest, GymServiceResponse } from './gym.interface';
import { GymsRepository } from './shared/repositories/gym.repository.interface';


export class GymService{
  constructor(private GymsRepository: GymsRepository) {}

  async execute({
    title,
    description,
    latitude,
    longitude,
    phone,
  }: GymServiceRequest): Promise<GymServiceResponse> {

    const gym = await this.GymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return {
      gym,
    }
  }
  
}