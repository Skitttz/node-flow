import { randomUUID } from "node:crypto";
import { existByField } from "@@app/shared/utils/exist-by-field";
import type { Prisma, User } from "@prisma/client";
import type { UsersRepository } from "./user.repository.interface";

export class inMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findUserById({ id }: { id: string }) {
    const user = this.items.find((item) => item.id === id);

    if (!user) return null;

    return user;
  }

  async checkEmailExists(email: string) {
    return existByField(this.items, "email", email);
  }

  async findUserByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) return null;

    return user;
  }

  async create({ email, name, password_hash }: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name,
      email,
      password_hash,
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }
}
