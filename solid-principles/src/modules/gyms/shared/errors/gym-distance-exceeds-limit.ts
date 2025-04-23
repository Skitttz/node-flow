import { AppError } from "@@app/shared/errors/AppError";
import { HttpStatusCodeEnum } from "@@shared/constants";

export class GymDistanceExceedsLimitError extends AppError{
  constructor(){
    super("current Gym exceeds the maximum allowed distance",Number(HttpStatusCodeEnum.BAD_REQUEST));
  }
}