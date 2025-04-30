import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { UserInvalidCredentials } from "../shared/errors/user-invalid-credentials";
import { inMemoryUsersRepository } from "../shared/repositories/in-memory.user.repository";
import { AuthUserService } from "./auth.service";

let inMemoryUserRepository: inMemoryUsersRepository;
let sut: AuthUserService;

describe("Auth User Flow", () => {
  beforeEach(() => {
    inMemoryUserRepository = new inMemoryUsersRepository();
    sut = new AuthUserService(inMemoryUserRepository);
  });
  it("should authenticate the user with valid credentials", async () => {
    await inMemoryUserRepository.create({
      name: "Example User",
      email: "example@mail.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "example@mail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should fail authenticate user with wrong email", async () => {
    await inMemoryUserRepository.create({
      name: "Example User 2",
      email: "example2@mail.com",
      password_hash: await hash("1234563", 6),
    });

    await expect(
      sut.execute({
        email: "example@mail.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserInvalidCredentials);
  });

  it("should fail authenticate user with wrong password", async () => {
    await inMemoryUserRepository.create({
      name: "Example User 3",
      email: "example3@mail.com",
      password_hash: await hash("123456", 6),
    });

    await expect(
      sut.execute({
        email: "example3@mail.com",
        password: "wrongpassword123",
      }),
    ).rejects.toBeInstanceOf(UserInvalidCredentials);
  });
});
