import type { User } from "@prisma/client";

interface UsersRepository {
  create(data: { name: string; email: string; password_hash: string }): Promise<User>
  checkEmailExists(email:string): Promise<boolean>
  findUserByEmail(email:string): Promise<User | null>
  findUserById(data:{id: string}): Promise<User | null>

}


export type { UsersRepository };
