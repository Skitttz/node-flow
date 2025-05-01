import { app } from "@@app/app";
import { HttpStatusCodeEnum } from "@@app/shared/constants";
import { AppRoutesEnum } from "@@app/shared/routes";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Refresh Token User (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it("should allow to auth user", async () => {
    await request(app.server).post(AppRoutesEnum.USER).send({
      name: "Tom",
      email: "tom@example.com",
      password: "123456",
    });

    const authResponse = await request(app.server)
      .post(AppRoutesEnum.SESSION)
      .send({
        name: "Tom",
        email: "tom@example.com",
        password: "123456",
      });

    const cookies = authResponse.get('Set-Cookie') as string[];

    const response = await request(app.server)
    .patch(AppRoutesEnum.REFRESH_TOKEN)
    .set('Cookie', cookies)
    .send();

    expect(response.statusCode).toEqual(HttpStatusCodeEnum.OK);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
