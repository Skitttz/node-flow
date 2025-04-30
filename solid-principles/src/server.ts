import { app } from "./app";
import { env } from "./config/env";

app
  .listen({
    host: "RENDER" in process.env ? "0.0.0.0" : "localhost",
    port: env.PORT,
  })
  .then(() => {
    console.log(`[PORT: ${env.PORT}] HTTP Server is Running! 🚀`);
  });
