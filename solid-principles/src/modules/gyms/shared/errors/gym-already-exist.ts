import { HttpStatusCodeEnum } from "@@app/shared/constants";
import { AppError } from "@@app/shared/errors/AppError";

export class GymAlreadyExistsError extends AppError {
  constructor() {
    super("This Gym Already Exist", HttpStatusCodeEnum.CONFLICT);
  }
}
