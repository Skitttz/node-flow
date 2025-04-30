import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./config/env";
import { checkInRoutes } from "./modules/checkIns/routes";
import { gymRoutes } from "./modules/gyms/routes";
import { userRoutes } from "./modules/users/routes";
import { HttpStatusCodeEnum } from "./shared/constants";

const app = fastify();
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: "10m",
  },
});
app.register(userRoutes);
app.register(checkInRoutes);
app.register(gymRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(HttpStatusCodeEnum.BAD_REQUEST)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: should use external tool like DataDog/NewRelic/Sentry
  }

  return reply
    .status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR)
    .send({ message: "Internal server error." });
});

export { app };
