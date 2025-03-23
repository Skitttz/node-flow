import cookie from "@fastify/cookie";
import fastify from "fastify";
import { env } from "./config/env";
import { transactionRoutes } from "./modules/transactions/routes";
import { setupRequestLogger } from "./shared/request-logger";
import { AppRoutesEnum } from "./shared/routes";

const app = fastify();

app.register(cookie);
setupRequestLogger(app);
app.register(transactionRoutes, {
  prefix: AppRoutesEnum.TRANSACTIONS,
})


app.listen({
  port:env.PORT
}).then(() => {
  console.log(`[PORT: ${env.PORT}] HTTP Server is Running! 🚀`)})