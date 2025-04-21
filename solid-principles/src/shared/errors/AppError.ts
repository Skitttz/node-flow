import { HttpStatusCodeEnum } from "../constants";

export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR) {
    super(message);
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
  }
}