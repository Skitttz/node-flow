import { AppError } from "@@app/shared/errors/AppError";
import { HttpStatusCodeEnum } from "@@shared/constants";

export class UserInvalidCredentials extends AppError {
  constructor() {
    super("Invalid Credentials", Number(HttpStatusCodeEnum.UNAUTHORIZED));
  }
}
