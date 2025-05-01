import { prisma } from "@@app/lib/prisma";
import { AppRoutesEnum } from "@@app/shared/routes";
import { hash } from "bcryptjs";
import type { FastifyInstance } from "fastify";
import request from "supertest";

async function createAndAuthenticateUser(app: FastifyInstance, isAdmin = false) {
  await prisma.user.create({
    data:{
      name: "Tom",
      email: "tom@example.com",
      password_hash: await hash("123456",6),
      role: isAdmin ? 'ADMIN' : 'MEMBER'
    }
  });

  const authResponse = await request(app.server)
    .post(AppRoutesEnum.SESSION)
    .send({
      name: "Tom",
      email: "tom@example.com",
      password: "123456",
    });

  const { token } = authResponse.body;

  return { token };
}

export { createAndAuthenticateUser };
