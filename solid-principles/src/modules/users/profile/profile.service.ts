
import { UserResourceNotFound } from "../shared/errors/user-resource-not-found";
import { UsersRepository } from "../shared/repositories/user.repository.interface";
import { ProfileUserRequest, ProfileUserResponse } from "./profile.dto";

export class ProfileUserService{
  constructor(private profileUserRepository: UsersRepository){}

  async execute({userId} : ProfileUserRequest): Promise<ProfileUserResponse>{
    const user = await this.profileUserRepository.findUserById({id:userId});

    if(!user) throw new UserResourceNotFound();

    return {
      user
    }
  }
}
