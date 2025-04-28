import { getJwtErrorResponse, isFastifyJwtError } from "@@app/shared/utils/fastify-jwt";
import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJWT(request : FastifyRequest,reply : FastifyReply){
  try{
    await request.jwtVerify();
  }
  catch(err){
    if(isFastifyJwtError(err)){
      const{ statusCode, message} = getJwtErrorResponse(err);
      return reply.status(statusCode).send({statusCode,message})
    }
    throw err;
  }
}