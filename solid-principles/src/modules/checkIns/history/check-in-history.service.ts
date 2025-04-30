import type { CheckInsRepository } from "../shared/repositories/check-in.repository.interface";
import type {
  CheckInsHistoryServiceRequest,
  CheckInsHistoryServiceResponse,
} from "./check-in-history.interface";

export class CheckInsHistoryService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userID,
    page,
  }: CheckInsHistoryServiceRequest): Promise<CheckInsHistoryServiceResponse> {
    const checkInsHistory = await this.checkInsRepository.findManyByUserId(
      userID,
      page,
    );

    return {
      checkInsHistory,
    };
  }
}
