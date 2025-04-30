import dayjs from "dayjs";
import { CheckInMinimumMinutesError } from "../shared/errors/check-in-pass-minimum-minutes";
import { CheckInResourceNotFound } from "../shared/errors/check-in-resource-not-found";
import type { CheckInsRepository } from "../shared/repositories/check-in.repository.interface";
import type {
  ValidateCheckInServiceRequest,
  ValidateCheckInServiceResponse,
} from "./validate-check-in.interface";

export class ValidateCheckInService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInServiceRequest): Promise<ValidateCheckInServiceResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new CheckInResourceNotFound();
    }

    const distanceInMinutesFromCheckInCreated = dayjs(new Date()).diff(
      checkIn.created_at,
      "minute",
    );

    const hasValidMinutesCheckIn = distanceInMinutesFromCheckInCreated > 20;

    if (hasValidMinutesCheckIn) {
      throw new CheckInMinimumMinutesError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return {
      checkIn,
    };
  }
}
