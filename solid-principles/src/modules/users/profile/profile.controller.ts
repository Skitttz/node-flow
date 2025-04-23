import { FastifyReply, FastifyRequest } from "fastify";
import { userStatusMessages } from "../constants";
import { UserResourceNotFound } from "../shared/errors/user-resource-not-found";
import { makeProfileUserService } from "./profile.factory";
import { profileUserBodySchema } from "./profile.schema";

export async function profileUserController(request: FastifyRequest,reply: FastifyReply){
  try{
    const profileUserService = makeProfileUserService();
    const params = profileUserBodySchema.parse(request.params);
    const profileUser = await profileUserService.execute({userId: params.userID})
    const {id,password_hash,...profileData} = profileUser.user;

    return reply.status(userStatusMessages.OK.statusCode).send(profileData);
    } catch(err: unknown){
      if (err instanceof UserResourceNotFound){
        const { statusCode, message } = err
        return reply.status(statusCode).send({statusCode,message})
      }

      throw err;
    }
    
}