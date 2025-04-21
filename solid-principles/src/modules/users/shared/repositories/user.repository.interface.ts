import type { User } from "@prisma/client";

interface UsersRepository {
  create(data: { name: string; email: string; password_hash: string }): Promise<User>
  checkEmailExists(data: { email: string }): Promise<boolean>
  findUserByEmail(data: { email: string }): Promise<User | null>
  findUserById(data:{id: string}): Promise<User | null>

}


export type { UsersRepository };
