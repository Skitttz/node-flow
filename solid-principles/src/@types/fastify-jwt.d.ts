import "@fastify/jwt";
import type { UserRole } from "./types";

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      role: UserRole
      sub: string
    };
  }
}
