import { userStatusMessages } from "@@app/modules/users/constants";
import { AppError } from "@@app/shared/errors/AppError";

export class UserAlreadyExistsError extends AppError {
  constructor() {
    super(
      userStatusMessages.CONFLICT.message,
      userStatusMessages.CONFLICT.statusCode,
    );
  }
}
