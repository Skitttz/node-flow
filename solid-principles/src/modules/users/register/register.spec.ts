import { AppError } from "@@app/shared/errors/AppError";
import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { inMemoryUsersRepository } from "../shared/repositories/in-memory.user.repository";
import { RegisterUsersService } from "./register.service";

let inMemoryUserRepository: inMemoryUsersRepository;
let sut: RegisterUsersService;


describe("Registration User Flow", () => {
  beforeEach(() => {
    inMemoryUserRepository = new inMemoryUsersRepository();
    sut = new RegisterUsersService(inMemoryUserRepository);
  })
  it("should hash password in before registration", async() =>{

    const {user} = await sut.execute({
      name: "Example User",
      email: "example@mail.com",
      password: "123456",
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  })
  it("should guarantee email uniqueness during registration", async() =>{

    await sut.execute({
      name: "Example User",
      email: "example@mail.com",
      password: "123456",
    })



    expect(async () => {
      await sut.execute({
        name: "Example User 2",
        email: "example@mail.com",
        password: "1234564",
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should be able to register", async() =>{


    const {user} = await sut.execute({
      name: "Example User",
      email: "example@mail.com",
      password: "123456",
    })

    expect(user.id).toEqual(expect.any(String));
  })

})