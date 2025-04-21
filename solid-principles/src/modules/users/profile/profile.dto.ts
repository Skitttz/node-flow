import type { User } from "@prisma/client";

interface ProfileUserRequest{
  userId:string;
}

interface ProfileUserResponse{
  user: User
}

export type { ProfileUserRequest, ProfileUserResponse };
