import type { UserRole } from "@@app/@types/types";

export const is = {
  Admin: (role: UserRole): boolean => {
    return role.toLowerCase() === "admin";
  },
  Member: (role: UserRole): boolean => {
    return role.toLowerCase() === "member";
  },
  normalize: (role: UserRole): string => role.toLowerCase(),
};
