import { beforeEach, describe, expect, it } from "vitest";
import { inMemoryCheckInsRepository } from "../shared/repositories/in-memory.check-ins.repository";
import { CheckInsHistoryService } from "./check-in-history.service";

let checkInsRepository: inMemoryCheckInsRepository;
let sut: CheckInsHistoryService;

async function createCheckIns(userID: string, count: number) {
  for (let i = 1; i <= count; i++) {
    await checkInsRepository.create({
      gym_id: `gym-${i}`,
      user_id: userID,
    });
  }
}

describe("Check In History Flow", () => {
  beforeEach(async () => {
    checkInsRepository = new inMemoryCheckInsRepository();
    sut = new CheckInsHistoryService(checkInsRepository);
  });

  it("should display all check-ins", async () => {
    await checkInsRepository.create({
      gym_id: "gym-one",
      user_id: "user-example-1",
    });
    await checkInsRepository.create({
      gym_id: "gym-two",
      user_id: "user-example-1",
    });

    const { checkInsHistory } = await sut.execute({
      userID: "user-example-1",
      page: 1,
    });

    expect(checkInsHistory).toHaveLength(2);
    expect(checkInsHistory).toEqual([
      expect.objectContaining({ gym_id: "gym-one", user_id: "user-example-1" }),
      expect.objectContaining({ gym_id: "gym-two", user_id: "user-example-1" }),
    ]);
  });

  it("should display paginated check-ins", async () => {
    await createCheckIns("user-example-1", 22);

    const { checkInsHistory } = await sut.execute({
      userID: "user-example-1",
      page: 2,
    });

    expect(checkInsHistory).toHaveLength(2);
    expect(checkInsHistory).toEqual([
      expect.objectContaining({ gym_id: "gym-21", user_id: "user-example-1" }),
      expect.objectContaining({ gym_id: "gym-22", user_id: "user-example-1" }),
    ]);
  });

  it("should display an empty array when user has no check-ins", async () => {
    const { checkInsHistory } = await sut.execute({
      userID: "non-existent-user",
      page: 1,
    });

    expect(checkInsHistory).toHaveLength(0);
  });
});
