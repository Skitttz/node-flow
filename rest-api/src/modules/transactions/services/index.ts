import { knex } from "@@app/config/database";
import { createOrReturnSessionId } from "@@app/shared/utils/create-or-return-session";
import { PaymentTypeEnum } from "@@transactions/constants";
import { IPostTransaction } from "@@transactions/types";
import { randomUUID } from "crypto";

async function getListTransactions(sessionId: string) {
  return knex('transactions')
    .where('session_id', sessionId)
    .select();
}

async function getTransactionById(id: string, sessionId: string) {
  return knex('transactions')
    .where({ id, session_id: sessionId })
    .first();
}

async function getSummary(sessionId: string) {
  return knex('transactions')
    .where('session_id', sessionId)
    .sum('amount', { as: 'amount' })
    .first();
}

async function createTransaction(body: IPostTransaction, sessionId: string) {
  const { title, amount, type } = body;

  const isCredit = type === PaymentTypeEnum.CREDIT;
  const valueAmount = isCredit ? amount : amount * -1;

  return knex('transactions').insert({
    id: randomUUID(),
    title,
    amount: valueAmount,
    session_id: sessionId
  });
}

function getOrCreateSessionId(sessionId?: string) {
  return createOrReturnSessionId(sessionId);
}

export const TransactionService = {
  getListTransactions,
  getTransactionById,
  getSummary,
  createTransaction,
  getOrCreateSessionId,
};
