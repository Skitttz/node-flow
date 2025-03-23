import { HttpStatusCodeEnum } from "@@app/shared/constants";

enum PaymentTypeEnum{
  CREDIT = 'credit',
  DEBIT = 'debit'
}

const transactionStatusMessages = {
  CREATED: {
    statusCode: HttpStatusCodeEnum.CREATED,
    message: 'Transaction created successfully',
  },
  UPDATED: {
    statusCode: HttpStatusCodeEnum.OK,
    message: 'Transaction updated successfully',
  },
  DELETED: {
    statusCode: HttpStatusCodeEnum.OK,
    message: 'Transaction deleted successfully',
  },
  BAD_REQUEST: {
    statusCode: HttpStatusCodeEnum.BAD_REQUEST,
    message: 'Invalid transaction',
  },
  NOT_FOUND: {
    statusCode: HttpStatusCodeEnum.NOT_FOUND,
    message: 'Transaction not found',
  },
  SERVER_ERROR: {
    statusCode: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
    message: 'Internal server error',
  },
  UNAUTHORIZED: {
    statusCode: HttpStatusCodeEnum.UNAUTHORIZED,
    message: 'Unauthorized',
  },
};

export { PaymentTypeEnum, transactionStatusMessages };

