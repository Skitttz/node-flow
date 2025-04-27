import { AppError } from "@@app/shared/errors/AppError";
import { HttpStatusCodeEnum } from "@@shared/constants";

export class CheckInResourceNotFound extends AppError{
  constructor(){
    super("CheckIn not found",Number(HttpStatusCodeEnum.NOT_FOUND));
  }
}