import { FastifyReply, FastifyRequest } from 'fastify';
import { transactionStatusMessages } from '../constants';

async function checkSessionId(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { sessionId } = request.cookies;
  if (!sessionId) {
    const { statusCode } = transactionStatusMessages.UNAUTHORIZED;
      
    return reply.status(statusCode).send({...transactionStatusMessages.UNAUTHORIZED});
    }
  
}

export { checkSessionId };
