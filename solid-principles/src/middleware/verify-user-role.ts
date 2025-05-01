import type { UserRole } from "@@app/@types/types";
import { userStatusMessages } from "@@app/modules/users/constants";
import { is } from "@@app/shared/utils/verify-user-role";
import type { FastifyReply, FastifyRequest } from "fastify";

type RoleKeys = 'Admin' | 'Member';

const roleUserToIsKey: Record<UserRole, RoleKeys> = {
  ADMIN: 'Admin',
  MEMBER: 'Member',
} as Record<UserRole, RoleKeys>;

export function verifyUserRole(userRole: UserRole) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user;

    const userRoleCheckFn: (role: UserRole) => boolean = is[roleUserToIsKey[userRole]];

    if (!userRoleCheckFn?.(role)) {
      return reply
        .status(userStatusMessages.UNAUTHORIZED.statusCode)
        .send({ ...userStatusMessages.UNAUTHORIZED });
    }
  };
}