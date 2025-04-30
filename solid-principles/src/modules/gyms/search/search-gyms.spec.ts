import { COORDINATES } from "@@app/modules/checkIns/constants";
import { beforeEach, describe, expect, it } from "vitest";
import { inMemoryGymsRepository } from "../shared/repositories/in-memory.gym.repository";
import { SearchGymsService } from "./search-gyms.service";

let searchGymsRepository: inMemoryGymsRepository;
let sut: SearchGymsService;

async function createGyms(title: string, count: number) {
  for (let i = 1; i <= count; i++) {
    await searchGymsRepository.create({
      title: `${title}-${i}`,
      description: "go gym",
      latitude: COORDINATES.DEFAULT.LATITUDE,
      longitude: COORDINATES.DEFAULT.LONGITUDE,
      phone: "11 1111-1111",
    });
  }
}

describe("Search Gyms Flow", () => {
  beforeEach(async () => {
    searchGymsRepository = new inMemoryGymsRepository();
    sut = new SearchGymsService(searchGymsRepository);
  });

  it("should return gyms matching the search", async () => {
    await searchGymsRepository.create({
      title: "gym-node",
      description: "node gym",
      latitude: COORDINATES.DEFAULT.LATITUDE,
      longitude: COORDINATES.DEFAULT.LONGITUDE,
      phone: "11 1111-1111",
    });

    await searchGymsRepository.create({
      title: "gym-go",
      description: "go gym",
      latitude: COORDINATES.DEFAULT.LATITUDE,
      longitude: COORDINATES.DEFAULT.LONGITUDE,
      phone: "11 1111-1111",
    });

    const { gyms } = await sut.execute({
      searchTerm: "gym-go",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "gym-go" })]);
  });

  it("should return paginated gyms based on the search", async () => {
    await createGyms("node-gym", 22);

    const { gyms } = await sut.execute({
      searchTerm: "node-gym",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "node-gym-21" }),
      expect.objectContaining({ title: "node-gym-22" }),
    ]);
  });
});
