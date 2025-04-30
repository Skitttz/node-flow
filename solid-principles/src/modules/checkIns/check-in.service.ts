import { getDistanceBetweenCoordinates } from "@@app/shared/utils/get-distance-between-coordinates";
import { GymDistanceExceedsLimitError } from "../gyms/shared/errors/gym-distance-exceeds-limit";
import { GymResourceNotFound } from "../gyms/shared/errors/gym-resource-not-found";
import type { GymsRepository } from "../gyms/shared/repositories/gym.repository.interface";
import type {
  CheckInServiceRequest,
  CheckInServiceResponse,
} from "./check-in.interface";
import { MAX_DISTANCE_IN_KILOMETERS } from "./constants";
import { CheckInSameDayError } from "./shared/errors/check-in-same-day";
import type { CheckInsRepository } from "./shared/repositories/check-in.repository.interface";

export class CheckInService {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const checkExistGym = await this.gymsRepository.findGymById(gymId);

    if (!checkExistGym) {
      throw new GymResourceNotFound();
    }

    const userToGymDistance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: checkExistGym.latitude.toNumber(),
        longitude: checkExistGym.longitude.toNumber(),
      },
    );

    const isTooFarFromGym = userToGymDistance > MAX_DISTANCE_IN_KILOMETERS;

    if (isTooFarFromGym) {
      throw new GymDistanceExceedsLimitError();
    }

    const checkInTheSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    );

    if (checkInTheSameDay) {
      throw new CheckInSameDayError();
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return {
      checkIn,
    };
  }
}
