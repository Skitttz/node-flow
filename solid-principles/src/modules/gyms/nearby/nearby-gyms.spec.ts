import { COORDINATES } from "@@app/modules/checkIns/constants";
import { beforeEach, describe, expect, it } from "vitest";
import { inMemoryGymsRepository } from "../shared/repositories/in-memory.gym.repository";
import { NearbyGymsService } from "./nearby-gyms.service";

let nearbyGymsRepository: inMemoryGymsRepository;
let sut: NearbyGymsService;
describe("Nearby Gyms Flow", () => {
  beforeEach(async () => {
    nearbyGymsRepository = new inMemoryGymsRepository();
    sut = new NearbyGymsService(nearbyGymsRepository);
  });

  it("should return nearby gyms", async () => {
    await nearbyGymsRepository.create({
      title: "Far Gym",
      description: "node gym",
      latitude: -27.2092052,
      longitude: -49.5229501,
      phone: "11 1111-1111",
    });

    await nearbyGymsRepository.create({
      title: "Near gym",
      description: "go gym",
      latitude: COORDINATES.DEFAULT.LATITUDE,
      longitude: COORDINATES.DEFAULT.LONGITUDE,
      phone: "11 1111-1111",
    });

    const { gyms } = await sut.execute({
      userLatitude: COORDINATES.DEFAULT.LATITUDE,
      userLongitude: COORDINATES.DEFAULT.LONGITUDE,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near gym" })]);
  });
});
