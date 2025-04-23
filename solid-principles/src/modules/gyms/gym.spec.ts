import { beforeEach, describe, expect, it } from "vitest";
import { COORDINATES } from "../checkIns/constants";
import { GymService } from "./gym.service";
import { inMemoryGymsRepository } from "./shared/repositories/in-memory.gym.repository";

let inMemoryGymRepository: inMemoryGymsRepository;
let sut: GymService;

describe("Gym Flow", () => {
  beforeEach(() => {
    inMemoryGymRepository = new inMemoryGymsRepository();
    sut = new GymService(inMemoryGymRepository);
  })
  it("should be able to create gym", async() =>{
    const {gym} = await sut.execute({
      title: "Example Gym",
      description: "example description gym",
      latitude: COORDINATES.DEFAULT.LATITUDE,
      longitude: COORDINATES.DEFAULT.LONGITUDE,
      phone: "11 1111-1111"
    })

    expect(gym.id).toEqual(expect.any(String));
  })
})