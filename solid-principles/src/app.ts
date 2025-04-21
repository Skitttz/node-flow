import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./config/env";
import { userRoutes } from "./modules/users/routes";
import { HttpStatusCodeEnum } from "./shared/constants";


const app = fastify();
app.register(userRoutes);


app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(HttpStatusCodeEnum.BAD_REQUEST)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: should use external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).send({ message: 'Internal server error.' })
})

export { app };
