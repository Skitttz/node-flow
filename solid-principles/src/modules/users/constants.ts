import { HttpStatusCodeEnum } from "@@app/shared/constants";

const userStatusMessages = {
  CREATED: {
    statusCode: HttpStatusCodeEnum.CREATED,
    message: 'User created successfully',
  },
  OK: {
    statusCode: HttpStatusCodeEnum.OK,
    message: 'Login successfully',
  },
  DELETED: {
    statusCode: HttpStatusCodeEnum.OK,
    message: 'User deleted successfully',
  },
  BAD_REQUEST: {
    statusCode: HttpStatusCodeEnum.BAD_REQUEST,
    message: 'Invalid user',
  },
  NOT_FOUND: {
    statusCode: HttpStatusCodeEnum.NOT_FOUND,
    message: 'User not found',
  },
  SERVER_ERROR: {
    statusCode: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
    message: 'Internal server error',
  },
  UNAUTHORIZED: {
    statusCode: HttpStatusCodeEnum.UNAUTHORIZED,
    message: 'Unauthorized',
  },
  CONFLICT: {
    statusCode: HttpStatusCodeEnum.CONFLICT,
    message: 'This User Already Exist'
  }
};

export { userStatusMessages };
