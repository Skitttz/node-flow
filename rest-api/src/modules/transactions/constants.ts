import { StatusCodeHttpEnum } from "@@app/shared/constants";

enum PaymentTypeEnum{
  CREDIT = 'credit',
  DEBIT = 'debit'
}

const transactionStatusMessages = {
  CREATED: {
    statusCode: StatusCodeHttpEnum.CREATED,
    message: 'Transaction created successfully',
  },
  UPDATED: {
    statusCode: StatusCodeHttpEnum.OK,
    message: 'Transaction updated successfully',
  },
  DELETED: {
    statusCode: StatusCodeHttpEnum.OK,
    message: 'Transaction deleted successfully',
  },
  BAD_REQUEST: {
    statusCode: StatusCodeHttpEnum.BAD_REQUEST,
    message: 'Invalid transaction',
  },
  NOT_FOUND: {
    statusCode: StatusCodeHttpEnum.NOT_FOUND,
    message: 'Transaction not found',
  },
  SERVER_ERROR: {
    statusCode: StatusCodeHttpEnum.INTERNAL_SERVER_ERROR,
    message: 'Internal server error',
  },
  UNAUTHORIZED: {
    statusCode: StatusCodeHttpEnum.UNAUTHORIZED,
    message: 'Unauthorized',
  },
};

export { PaymentTypeEnum, transactionStatusMessages };

