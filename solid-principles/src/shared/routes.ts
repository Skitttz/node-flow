enum AppRoutesEnum {
  USER = "/users",
  SESSION = "/sessions",
  REFRESH_TOKEN = '/token/refresh',
  PROFILE = "/me",
  GYM = "/gyms",
  GYM_SEARCH = "/gyms/search",
  GYM_NEARBY = "/gyms/nearby",
  CHECK_IN = "/gyms/:gymId/check-ins",
  CHECK_IN_HISTORY = "/check-ins/history",
  CHECK_IN_VALIDATE = "/check-ins/:checkInId/validate",
  CHECK_IN_METRIC = "/check-ins/metrics",
}

export { AppRoutesEnum };
