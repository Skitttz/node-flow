import { app } from "@@app/app";
import { prisma } from "@@app/lib/prisma";
import { HttpStatusCodeEnum } from "@@app/shared/constants";
import { AppRoutesEnum } from "@@app/shared/routes";
import { createAndAuthenticateUser } from "@@app/shared/utils/tests/created-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Check in Validate (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should allow to validate check in", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        title: "JS Gym",
        description: "JS gym",
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    });

    let checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    });

    const response = await request(app.server)
      .patch(AppRoutesEnum.CHECK_IN_VALIDATE.replace(":checkInId", checkIn.id))
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(HttpStatusCodeEnum.NO_CONTENT);

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });
});
