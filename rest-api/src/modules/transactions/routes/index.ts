import { AppRoutesEnum } from "@@app/shared/routes";
import { TransactionController } from "@@transactions/controllers";
import { checkSessionId } from "@@transactions/middlewares/check-session-id";
import { FastifyInstance } from "fastify";

export async function transactionRoutes(app: FastifyInstance) {

  app.get(AppRoutesEnum.BASE, { preHandler: [checkSessionId] }, TransactionController.getList);

  app.get(AppRoutesEnum.BASE_BY_ID, { preHandler: [checkSessionId] }, TransactionController.getById);

  app.get(AppRoutesEnum.TRANSACTIONS_SUMMARY, { preHandler: [checkSessionId] }, TransactionController.getSummary);

  app.post(AppRoutesEnum.BASE, TransactionController.create);
}
