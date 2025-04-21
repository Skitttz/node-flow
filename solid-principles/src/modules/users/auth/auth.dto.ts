import type { User } from "@prisma/client";

interface AuthUserRequest{
  email:string;
  password:string;
}

interface AuthUserResponse{
  user: User
}

export type { AuthUserRequest, AuthUserResponse };
