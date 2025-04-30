import type { CheckInsRepository } from "../shared/repositories/check-in.repository.interface";
import type {
  CheckInsMetricsUserServiceRequest,
  CheckInsMetricsUserServiceResponse,
} from "./check-in-metric.interface";

export class CheckInsMetricUserService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userID,
  }: CheckInsMetricsUserServiceRequest): Promise<CheckInsMetricsUserServiceResponse> {
    const checkInsMetricsUser =
      await this.checkInsRepository.totalCheckInsByUserId(userID);

    return { checkInsCount: checkInsMetricsUser };
  }
}
