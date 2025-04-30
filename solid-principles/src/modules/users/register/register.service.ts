import { UserAlreadyExistsError } from "@@users/shared/errors/user-already-exist";
import type { UsersRepository } from "@@users/shared/repositories/user.repository.interface";
import { hash } from "bcryptjs";
import type { RegisterUserRequest, RegisterUserResponse } from "./register.dto";

export class RegisterUsersService {
  constructor(private registerUserRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: RegisterUserRequest): Promise<RegisterUserResponse> {
    const password_hash = await hash(password, 6);
    const hasUserWithSameEmail =
      await this.registerUserRepository.checkEmailExists(email);

    if (hasUserWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.registerUserRepository.create({
      name,
      email,
      password_hash,
    });

    return { user };
  }
}
