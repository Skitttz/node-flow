import { HttpStatusCodeEnum } from "@@app/shared/constants";
import { AppError } from "@@app/shared/errors/AppError";

export class CheckInSameDayError extends AppError {
  constructor() {
    super("Already create check in today", Number(HttpStatusCodeEnum.CONFLICT));
  }
}
