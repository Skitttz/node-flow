import { app } from "@@app/app";
import { HttpStatusCodeEnum } from "@@app/shared/constants";
import { AppRoutesEnum } from "@@app/shared/routes";
import { createAndAuthenticateUser } from "@@app/shared/utils/tests/created-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Auth User (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it("should allow to view user profile", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const response = await request(app.server)
      .get(AppRoutesEnum.PROFILE)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(HttpStatusCodeEnum.OK);
    expect(response.body.profile).toEqual(
      expect.objectContaining({ email: "tom@example.com" }),
    );
  });
});
