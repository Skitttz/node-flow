import { HttpStatusCodeEnum } from "@@app/shared/constants";
import { AppError } from "@@app/shared/errors/AppError";
import { FastifyReply, FastifyRequest } from "fastify";
import { userStatusMessages } from "../constants";
import { makeRegisterUserService } from "./register.factory";
import { registerBodySchema } from "./register.schema";

export async function registerUserController(request: FastifyRequest,reply: FastifyReply){
    const {name,email,password} = registerBodySchema.parse(request.body);

    try{
      const registerUsersService = makeRegisterUserService();
      await registerUsersService.execute({email,name,password})
    } catch(err: unknown){
      if (err instanceof AppError){
        const { statusCode, message } = err
        return reply.status(statusCode).send({statusCode,message})
      }

      throw err;
    }
    
    return reply.status(HttpStatusCodeEnum.CREATED).send({...userStatusMessages.CREATED});
}