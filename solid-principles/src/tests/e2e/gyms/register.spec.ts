import { app } from "@@app/app";
import { COORDINATES } from "@@app/modules/checkIns/constants";
import { HttpStatusCodeEnum } from "@@app/shared/constants";
import { AppRoutesEnum } from "@@app/shared/routes";
import { createAndAuthenticateUser } from "@@app/shared/utils/tests/created-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Register Gym (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it("should allow to create gym", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const response = await request(app.server)
      .post(AppRoutesEnum.GYM)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Node Gym",
        description: "Descripton Gym Node",
        phone: "1181299999",
        latitude: COORDINATES.DEFAULT.LATITUDE,
        longitude: COORDINATES.DEFAULT.LONGITUDE,
      });

    expect(response.statusCode).toEqual(HttpStatusCodeEnum.CREATED);
  });
});
