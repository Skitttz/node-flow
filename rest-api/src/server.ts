import { app } from "./app"
import { env } from "./config/env"


app.listen({
  port:env.PORT
}).then(() => {
  console.log(`[PORT: ${env.PORT}] HTTP Server is Running! 🚀`)})