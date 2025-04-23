import { AppError } from "@@app/shared/errors/AppError";
import { HttpStatusCodeEnum } from "@@shared/constants";

export class GymResourceNotFound extends AppError{
  constructor(){
    super("Gym not found",Number(HttpStatusCodeEnum.NOT_FOUND));
  }
}