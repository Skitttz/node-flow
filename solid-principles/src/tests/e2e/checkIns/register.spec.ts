import { app } from "@@app/app";
import { prisma } from "@@app/lib/prisma";
import { COORDINATES } from "@@app/modules/checkIns/constants";
import { HttpStatusCodeEnum } from "@@app/shared/constants";
import { AppRoutesEnum } from "@@app/shared/routes";
import { createAndAuthenticateUser } from "@@app/shared/utils/tests/created-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Register Check In (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it("should allow to create check in", async () => {
    const { token } = await createAndAuthenticateUser(app,true);

    const gym = await prisma.gym.create({
      data: {
        title: "Node gym",
        description: "go gym",
        latitude: COORDINATES.DEFAULT.LATITUDE,
        longitude: COORDINATES.DEFAULT.LONGITUDE,
        phone: "11 1111-1111",
      },
    });

    const response = await request(app.server)
      .post(AppRoutesEnum.CHECK_IN.replace(":gymId", gym.id))
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: COORDINATES.DEFAULT.LATITUDE,
        longitude: COORDINATES.DEFAULT.LONGITUDE,
      });

    expect(response.statusCode).toEqual(HttpStatusCodeEnum.CREATED);
  });
});
