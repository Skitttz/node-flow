import { app } from "@@app/app";
import { COORDINATES } from "@@app/modules/checkIns/constants";
import { HttpStatusCodeEnum } from "@@app/shared/constants";
import { AppRoutesEnum } from "@@app/shared/routes";
import { createAndAuthenticateUser } from "@@app/shared/utils/tests/created-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Search Gyms (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it("should allow to search gyms", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post(AppRoutesEnum.GYM)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Node Gym",
        description: "Descripton Node Gym",
        phone: "1181299999",
        latitude: COORDINATES.DEFAULT.LATITUDE,
        longitude: COORDINATES.DEFAULT.LONGITUDE,
      });

    await request(app.server)
      .post(AppRoutesEnum.GYM)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Java Gym",
        description: "Descripton Java Gym",
        phone: "1181299999",
        latitude: COORDINATES.DEFAULT.LATITUDE,
        longitude: COORDINATES.DEFAULT.LONGITUDE,
      });

    const response = await request(app.server)
      .get(AppRoutesEnum.GYM_SEARCH)
      .query({ searchTerm: "Java" })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(HttpStatusCodeEnum.OK);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Java Gym",
      }),
    ]);
  });
});
