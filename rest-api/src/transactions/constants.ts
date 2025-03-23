import { StatusCodeHttp } from "@@app/global/constants";

enum PaymentTypeEnum{
  CREDIT = 'credit',
  DEBIT = 'debit'
}

const transactionStatusMessages = {
  CREATED: {
    statusCode: StatusCodeHttp.CREATED,
    message: 'Transaction created successfully',
  },
  UPDATED: {
    statusCode: StatusCodeHttp.OK,
    message: 'Transaction updated successfully',
  },
  DELETED: {
    statusCode: StatusCodeHttp.OK,
    message: 'Transaction deleted successfully',
  },
  BAD_REQUEST: {
    statusCode: StatusCodeHttp.BAD_REQUEST,
    message: 'Invalid transaction',
  },
  NOT_FOUND: {
    statusCode: StatusCodeHttp.NOT_FOUND,
    message: 'Transaction not found',
  },
  SERVER_ERROR: {
    statusCode: StatusCodeHttp.INTERNAL_SERVER_ERROR,
    message: 'Internal server error',
  },
  UNAUTHORIZED: {
    statusCode: StatusCodeHttp.UNAUTHORIZED,
    message: 'Unauthorized',
  },
};

export { PaymentTypeEnum, transactionStatusMessages };

