import { AppError } from "@@app/shared/errors/AppError";
import { HttpStatusCodeEnum } from "@@shared/constants";

export class CheckInMinimumMinutesError extends AppError{
  constructor(){
    super("current Check in until validate 20 minutes", Number(HttpStatusCodeEnum.BAD_REQUEST));
  }
}