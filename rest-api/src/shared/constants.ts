enum HttpStatusCodeEnum {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  UNAUTHORIZED = 401,
}

enum CookieKeyEnum {
  SESSION_ID = 'sessionId',
}

export { CookieKeyEnum, HttpStatusCodeEnum };

