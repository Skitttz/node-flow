
import { UserInvalidCredentials } from "@@users/shared/errors/user-invalid-credentials";
import { compare } from "bcryptjs";
import { UsersRepository } from "../shared/repositories/user.repository.interface";
import { AuthUserRequest, AuthUserResponse } from "./auth.dto";

export class AuthUserService{
  constructor(private authUserRepository: UsersRepository){}

  async execute({email,password} : AuthUserRequest): Promise<AuthUserResponse>{
    const user = await this.authUserRepository.findUserByEmail({email:email});

    if(!user){
      throw new UserInvalidCredentials();
    }

    const isInvalidPassword = !(await compare(password, user.password_hash));

    if (isInvalidPassword) {
      throw new UserInvalidCredentials();
    }

    return {
      user
    }
  }
}
