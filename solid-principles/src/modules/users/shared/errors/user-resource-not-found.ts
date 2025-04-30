import { AppError } from "@@app/shared/errors/AppError";
import { HttpStatusCodeEnum } from "@@shared/constants";

export class UserResourceNotFound extends AppError {
  constructor() {
    super("User not found", Number(HttpStatusCodeEnum.NOT_FOUND));
  }
}
