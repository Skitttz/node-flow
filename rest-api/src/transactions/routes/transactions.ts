import { knex } from "@@app/database";
import { AppRoutesEnum } from "@@app/global/routes";
import { createOrReturnSessionId } from "@@app/utils/create-or-return-session";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "node:crypto";
import { PaymentTypeEnum, transactionStatusMessages } from "../constants";
import { checkSessionId } from "../middlewares/check-session-id";
import { makeTransactionBodySchema, transactionByIdSchema } from "../schemas/transactions";

export async function transactionRoutes(app: FastifyInstance) {

  app.get(AppRoutesEnum.BASE, {preHandler: [checkSessionId]}, async(request:FastifyRequest) => {
    const {sessionId} = request.cookies;

    const transactions = await knex('transactions').where('session_id',sessionId).select();
    return {transactions}
  });

  app.get(AppRoutesEnum.BASE_BY_ID, {preHandler: [checkSessionId]}, async(request:FastifyRequest,reply) => {
    try{
      const params = transactionByIdSchema.parse(request.params);
      const { sessionId } = request.cookies;
      const transaction = await knex('transactions').where({
        id:params.id,
        session_id: sessionId
      }).first();

      if (!transaction) {
        const {statusCode} = transactionStatusMessages.NOT_FOUND

        return reply.status(statusCode).send({...transactionStatusMessages.NOT_FOUND});
      }
      reply.send({ transaction });

    }catch(err){
      if (err instanceof Error) {
      
        const {statusCode} = transactionStatusMessages.BAD_REQUEST;
        return reply.status(statusCode).send({
          ... transactionStatusMessages.BAD_REQUEST,
        });
    }
    const {statusCode} = transactionStatusMessages.SERVER_ERROR;
    return reply.status(statusCode).send({ ...transactionStatusMessages.SERVER_ERROR});
}});

  app.get(AppRoutesEnum.SUMMARY, {preHandler: [checkSessionId]}, async(request:FastifyRequest) => {
    const { sessionId } = request.cookies;
    const summary = await knex('transactions').where('session_id',sessionId).sum('amount',{ as: 'amount'}).first();

    return {summary}
  });


  app.post(AppRoutesEnum.BASE, {preHandler: [checkSessionId]},async (request: FastifyRequest, reply:FastifyReply) => {
    let sessionId = request.cookies.sessionId;
    sessionId = createOrReturnSessionId(sessionId)

    try {
      const { title, amount, type } = makeTransactionBodySchema.parse(request.body);
      const isPaymentCredit = type === PaymentTypeEnum.CREDIT;
      const valueAmount = isPaymentCredit ? amount : amount * -1;
      
      await knex('transactions').insert({
        id: randomUUID(),
        title,
        amount: valueAmount,
        session_id: sessionId
      });
      
      return reply.status(transactionStatusMessages.CREATED.statusCode)
        .send({...transactionStatusMessages.CREATED});
    } catch (error) {
      if (error instanceof Error) {
        const {statusCode} = transactionStatusMessages.BAD_REQUEST;
        return reply.status(statusCode).send({...transactionStatusMessages.BAD_REQUEST});
      }

      const {statusCode} = transactionStatusMessages.SERVER_ERROR;
      return reply.status(statusCode).send({...transactionStatusMessages.SERVER_ERROR });
    }
  });
}