import { app } from "@@app/app";
import { prisma } from "@@app/lib/prisma";
import { COORDINATES } from "@@app/modules/checkIns/constants";
import { HttpStatusCodeEnum } from "@@app/shared/constants";
import { AppRoutesEnum } from "@@app/shared/routes";
import { createAndAuthenticateUser } from "@@app/shared/utils/tests/created-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Check In History (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it("should allow to view check in history", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();
    const gym = await prisma.gym.create({
      data: {
        title: "GO gym",
        description: "go gym",
        latitude: COORDINATES.DEFAULT.LATITUDE,
        longitude: COORDINATES.DEFAULT.LONGITUDE,
        phone: "11 1111-1111",
      },
    });

    const { count } = await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id,
        },
        {
          gym_id: gym.id,
          user_id: user.id,
        },
      ],
    });

    const response = await request(app.server)
      .get(AppRoutesEnum.CHECK_IN_HISTORY)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(HttpStatusCodeEnum.OK);
    expect(response.body.checkInsHistory).toEqual([
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id,
      }),
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id,
      }),
    ]);
  });
});
