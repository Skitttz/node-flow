import type { User } from "@prisma/client";

interface RegisterUserRequest {
  name: string,
  email:string,
  password: string,
}

interface RegisterUserResponse {
  user: User;
}


export type { RegisterUserRequest, RegisterUserResponse };

