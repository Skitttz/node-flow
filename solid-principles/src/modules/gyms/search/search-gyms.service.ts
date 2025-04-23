import { GymsRepository } from '@@gyms/shared/repositories/gym.repository.interface';
import { SearchGymsServiceRequest, SearchGymsServiceResponse } from './search-gyms.interface';


export class SearchGymsService{
  constructor(private GymsRepository: GymsRepository) {}

  async execute({
    searchTerm,
    page,
  }: SearchGymsServiceRequest): Promise<SearchGymsServiceResponse> {

    const gyms = await this.GymsRepository.searchManyGyms(searchTerm,page);

    return {
      gyms
    }
  }
  
}