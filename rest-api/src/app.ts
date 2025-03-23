import { transactionRoutes } from "@@modules/transactions/routes";
import { setupRequestLogger } from "@@shared/request-logger";
import { AppRoutesEnum } from "@@shared/routes";
import cookie from "@fastify/cookie";
import fastify from "fastify";

export const app = fastify();

app.register(cookie);
setupRequestLogger(app);
app.register(transactionRoutes, {
  prefix: AppRoutesEnum.TRANSACTIONS,
})
