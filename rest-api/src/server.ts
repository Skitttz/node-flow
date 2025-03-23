import cookie from "@fastify/cookie";
import fastify from "fastify";
import { env } from "./env";
import { setupRequestLogger } from "./global/request-logger";
import { AppRoutesEnum } from "./global/routes";
import { transactionRoutes } from "./transactions/routes/transactions";

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