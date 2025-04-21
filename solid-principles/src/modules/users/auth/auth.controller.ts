import { FastifyReply, FastifyRequest } from "fastify";
import { userStatusMessages } from "../constants";
import { UserInvalidCredentials } from "../shared/errors/user-invalid-credentials";
import { makeAuthUserService } from "./auth.factory";
import { authUserBodySchema } from "./auth.schema";

export async function authUserController(request: FastifyRequest,reply: FastifyReply){
    const {email,password} = authUserBodySchema.parse(request.body);

    try{
      const authUserService = makeAuthUserService();
      await authUserService.execute({email,password})
    } catch(err: unknown){
      if (err instanceof UserInvalidCredentials){
        const { statusCode, message } = err
        return reply.status(statusCode).send({statusCode,message})
      }

      throw err;
    }
    
    return reply.status(userStatusMessages.OK.statusCode).send(userStatusMessages.OK.message);
}