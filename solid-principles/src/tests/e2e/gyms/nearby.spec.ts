import { app } from "@@app/app";
import { COORDINATES } from "@@app/modules/checkIns/constants";
import { HttpStatusCodeEnum } from "@@app/shared/constants";
import { AppRoutesEnum } from "@@app/shared/routes";
import { createAndAuthenticateUser } from "@@app/shared/utils/tests/created-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Nearby Gyms (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it("should allow to nearby gym", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post(AppRoutesEnum.GYM)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Far Gym",
        description: "node gym",
        latitude: -27.2092052,
        longitude: -49.5229501,
        phone: "11 1111-1111",
      });

    await request(app.server)
      .post(AppRoutesEnum.GYM)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Near gym",
        description: "go gym",
        latitude: COORDINATES.DEFAULT.LATITUDE,
        longitude: COORDINATES.DEFAULT.LONGITUDE,
        phone: "11 1111-1111",
      });

    const response = await request(app.server)
      .get(AppRoutesEnum.GYM_NEARBY)
      .query({
        userLatitude: COORDINATES.DEFAULT.LATITUDE,
        userLongitude: COORDINATES.DEFAULT.LONGITUDE,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: "Near gym" }),
    ]);
    expect(response.statusCode).toEqual(HttpStatusCodeEnum.OK);
  });
});
