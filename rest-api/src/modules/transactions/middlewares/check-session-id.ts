import { transactionStatusMessages } from '@@transactions/constants';
import { FastifyReply, FastifyRequest } from 'fastify';

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
