import { UserInvalidCredentials } from "@@users/shared/errors/user-invalid-credentials";
import { compare } from "bcryptjs";
import type { UsersRepository } from "../shared/repositories/user.repository.interface";
import type { AuthUserRequest, AuthUserResponse } from "./auth.dto";

export class AuthUserService {
  constructor(private authUserRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthUserRequest): Promise<AuthUserResponse> {
    const user = await this.authUserRepository.findUserByEmail(email);

    if (!user) {
      throw new UserInvalidCredentials();
    }

    const isInvalidPassword = !(await compare(password, user.password_hash));

    if (isInvalidPassword) {
      throw new UserInvalidCredentials();
    }

    return {
      user,
    };
  }
}
