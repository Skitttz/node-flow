import { Decimal } from "@prisma/client/runtime/library";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GymDistanceExceedsLimitError } from "../gyms/shared/errors/gym-distance-exceeds-limit";
import { inMemoryGymsRepository } from "../gyms/shared/repositories/in-memory.gym.repository";
import { CheckInService } from "./check-in.service";
import { COORDINATES } from "./constants";
import { CheckInSameDayError } from "./shared/errors/check-in-same-day";
import { inMemoryCheckInsRepository } from "./shared/repositories/in-memory.check-ins.repository";

let checkInsRepository: inMemoryCheckInsRepository;
let gymsRepository: inMemoryGymsRepository;
let sut: CheckInService;

describe("Check In Flow", () => {
  beforeEach(async () => {
    checkInsRepository = new inMemoryCheckInsRepository();
    gymsRepository = new inMemoryGymsRepository();
    sut = new CheckInService(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-flow",
      title: "Gym flow",
      description: "gym flow description",
      phone: "11 1111-1111",
      latitude: COORDINATES.DEFAULT.LATITUDE,
      longitude: COORDINATES.DEFAULT.LONGITUDE,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useFakeTimers();
  });

  it("should allow check in", async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-flow",
      userId: "random-user",
      userLatitude: COORDINATES.DEFAULT.LATITUDE,
      userLongitude: COORDINATES.DEFAULT.LONGITUDE,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not allowed check in twice in same day", async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-flow",
      userId: "random-user",
      userLatitude: COORDINATES.DEFAULT.LATITUDE,
      userLongitude: COORDINATES.DEFAULT.LONGITUDE,
    });

    await expect(
      sut.execute({
        gymId: "gym-flow",
        userId: "random-user",
        userLatitude: COORDINATES.DEFAULT.LATITUDE,
        userLongitude: COORDINATES.DEFAULT.LONGITUDE,
      }),
    ).rejects.toBeInstanceOf(CheckInSameDayError);
  });

  it("should allowed check in different day", async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-flow",
      userId: "random-user",
      userLatitude: COORDINATES.DEFAULT.LATITUDE,
      userLongitude: COORDINATES.DEFAULT.LONGITUDE,
    });

    vi.setSystemTime(new Date(2025, 0, 21, 8, 0, 0));

    await expect(
      sut.execute({
        gymId: "gym-flow",
        userId: "random-user",
        userLatitude: COORDINATES.DEFAULT.LATITUDE,
        userLongitude: COORDINATES.DEFAULT.LONGITUDE,
      }),
    ).resolves.toBeTruthy();
  });

  it("should deny check in gym on long distant", async () => {
    await gymsRepository.create({
      id: "gym-deny-check",
      title: "Gym Deny",
      description: "gym deny description",
      phone: "11 1111-1111",
      latitude: new Decimal(-27.0747279),
      longitude: new Decimal(-49.4889672),
    });

    await expect(
      sut.execute({
        gymId: "gym-deny-check",
        userId: "random-user",
        userLatitude: COORDINATES.DEFAULT.LATITUDE,
        userLongitude: COORDINATES.DEFAULT.LONGITUDE,
      }),
    ).rejects.toBeInstanceOf(GymDistanceExceedsLimitError);
  });
});
