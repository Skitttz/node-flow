import { prisma } from "@@app/lib/prisma";
import type { Prisma } from "@prisma/client";
import type { UsersRepository } from "./user.repository.interface";

export class PrismaUserRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findUserById({ id }: { id: string }) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async checkEmailExists(email: string) {
    const hasUserWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return Boolean(hasUserWithSameEmail);
  }
}
