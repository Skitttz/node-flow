import { CookieKeyEnum } from "@@app/shared/constants";
import { generateCookieConfig } from "@@app/shared/cookies";
import { PaymentTypeEnum, transactionStatusMessages } from "@@transactions/constants";
import { createTransactionBodySchema, transactionByIdSchema } from "@@transactions/schemas";
import { TransactionService } from "@@transactions/services";
import { IPostTransaction } from "@@transactions/types";
import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

async function getList(request: FastifyRequest, reply: FastifyReply) {
  const sessionId = request.cookies.sessionId as string;
  const transactions = await TransactionService.getListTransactions(sessionId);
  reply.send({ transactions });
}

async function getById(request: FastifyRequest, reply: FastifyReply) {
  try {
    const params = transactionByIdSchema.parse(request.params);
    const sessionId = request.cookies.sessionId as string;
    const transaction = await TransactionService.getTransactionById(params.id, sessionId);

    if (!transaction) {
      return reply.status(transactionStatusMessages.NOT_FOUND.statusCode)
        .send({ ...transactionStatusMessages.NOT_FOUND });
    }

    reply.send({ transaction });
  } catch (error) {
    if (error instanceof ZodError) {
      const {statusCode} = transactionStatusMessages.BAD_REQUEST;
      return reply.status(statusCode).send({...transactionStatusMessages.BAD_REQUEST});
    }
    return reply.status(transactionStatusMessages.SERVER_ERROR.statusCode)
      .send({ ...transactionStatusMessages.SERVER_ERROR });
  }
}

async function getSummary(request: FastifyRequest, reply: FastifyReply) {
  const sessionId = request.cookies.sessionId as string; 
  const summary = await TransactionService.getSummary(sessionId);
  reply.send({ summary });
}

async function create(request: FastifyRequest, reply: FastifyReply) {
  try {
    const parsed = createTransactionBodySchema.parse(request.body);
    const body: IPostTransaction = {
      ...parsed,
      type: parsed.type as PaymentTypeEnum,
    };

    const { sessionId: cookieSessionId } = request.cookies;

    const sessionId = TransactionService.getOrCreateSessionId(cookieSessionId);

    await TransactionService.createTransaction(body, sessionId);
    reply.setCookie(CookieKeyEnum.SESSION_ID, sessionId, generateCookieConfig());

    return reply.status(transactionStatusMessages.CREATED.statusCode)
      .send({ ...transactionStatusMessages.CREATED });
  } catch (error) {
    if (error instanceof ZodError) {
      const {statusCode} = transactionStatusMessages.BAD_REQUEST;
      return reply.status(statusCode).send({...transactionStatusMessages.BAD_REQUEST});
    }
    return reply.status(transactionStatusMessages.SERVER_ERROR.statusCode)
      .send({ ...transactionStatusMessages.SERVER_ERROR });
  }
}

export const TransactionController = {
  getList,
  getById,
  getSummary,
  create
};