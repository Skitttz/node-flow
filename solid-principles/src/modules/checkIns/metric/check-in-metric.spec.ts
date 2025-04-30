import { beforeEach, describe, expect, it } from "vitest";
import { inMemoryCheckInsRepository } from "../shared/repositories/in-memory.check-ins.repository";
import { CheckInsMetricUserService } from "./check-in-metric.service";

describe("Check In Metrics Flow", () => {
  let checkInsRepository: inMemoryCheckInsRepository;
  let sut: CheckInsMetricUserService;

  beforeEach(() => {
    checkInsRepository = new inMemoryCheckInsRepository();
    sut = new CheckInsMetricUserService(checkInsRepository);
  });

  it("should display the correct check-ins count from metrics", async () => {
    const userId = "example-user";
    await Promise.all([
      checkInsRepository.create({
        gym_id: "gym-node-01",
        user_id: userId,
        created_at: new Date(),
      }),
      checkInsRepository.create({
        gym_id: "gym-node-02",
        user_id: userId,
        created_at: new Date(),
      }),
    ]);

    const { checkInsCount } = await sut.execute({ userID: userId });

    expect(checkInsCount).toEqual(2);
  });

  it("should display empty(0) check-ins for a user with no add check-ins", async () => {
    const userId = "non-existent-user";

    const { checkInsCount } = await sut.execute({ userID: userId });

    expect(checkInsCount).toEqual(0);
  });

  it("should only count check-ins for the specified user", async () => {
    const targetUserId = "example-user";
    const otherUserId = "other-user";
    await Promise.all([
      checkInsRepository.create({
        gym_id: "gym-node-01",
        user_id: targetUserId,
      }),
      checkInsRepository.create({
        gym_id: "gym-node-02",
        user_id: otherUserId,
      }),
    ]);

    const { checkInsCount } = await sut.execute({ userID: targetUserId });

    expect(checkInsCount).toEqual(1);
  });
});
