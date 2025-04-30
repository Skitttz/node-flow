import { HttpStatusCodeEnum } from "../constants";

enum FastifyJwtCodeErrorEnum {
  FST_JWT_AUTHORIZATION_TOKEN_INVALID = "FST_JWT_AUTHORIZATION_TOKEN_INVALID",
  FST_JWT_NO_AUTHORIZATION_IN_HEADER = "FST_JWT_NO_AUTHORIZATION_IN_HEADER",
  FST_JWT_AUTHORIZATION_TOKEN_EXPIRED = "FST_JWT_AUTHORIZATION_TOKEN_EXPIRED",
}

enum JwtErrorMessageEnum {
  INVALID_TOKEN = "Invalid token",
  NO_TOKEN_PROVIDED = "No token provided",
  TOKEN_EXPIRED = "Token has expired",
  GENERIC_AUTH_ERROR = "Authentication error",
}

const jwtErrorResponseMap: Record<
  FastifyJwtCodeErrorEnum,
  { statusCode: number; message: JwtErrorMessageEnum }
> = {
  [FastifyJwtCodeErrorEnum.FST_JWT_AUTHORIZATION_TOKEN_INVALID]: {
    statusCode: HttpStatusCodeEnum.UNAUTHORIZED,
    message: JwtErrorMessageEnum.INVALID_TOKEN,
  },
  [FastifyJwtCodeErrorEnum.FST_JWT_NO_AUTHORIZATION_IN_HEADER]: {
    statusCode: HttpStatusCodeEnum.UNAUTHORIZED,
    message: JwtErrorMessageEnum.NO_TOKEN_PROVIDED,
  },
  [FastifyJwtCodeErrorEnum.FST_JWT_AUTHORIZATION_TOKEN_EXPIRED]: {
    statusCode: HttpStatusCodeEnum.UNAUTHORIZED,
    message: JwtErrorMessageEnum.TOKEN_EXPIRED,
  },
};

function isFastifyJwtError(err: unknown): boolean {
  const e = err as { code?: string };
  return e.code
    ? Object.values(FastifyJwtCodeErrorEnum).includes(
        e.code as FastifyJwtCodeErrorEnum,
      )
    : false;
}

function getJwtErrorResponse(err: unknown): {
  statusCode: number;
  message: string;
} {
  const e = err as { code?: string; statusCode?: number };

  if (e.code) {
    const response = jwtErrorResponseMap[e.code as FastifyJwtCodeErrorEnum];

    if (response) {
      return {
        statusCode: response.statusCode,
        message: response.message,
      };
    }
  }

  return {
    statusCode: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
    message: JwtErrorMessageEnum.GENERIC_AUTH_ERROR,
  };
}

export { getJwtErrorResponse, isFastifyJwtError, jwtErrorResponseMap };
