import { verifyJWT } from "@@app/middleware/verify-jwt";
import { verifyUserRole } from "@@app/middleware/verify-user-role";
import { AppRoutesEnum } from "@@app/shared/routes";
import type { FastifyInstance } from "fastify";
import { checkInController } from "./check-in.controller";
import { checkInHistoryController } from "./history/check-in-history.controller";
import { checkInMetricController } from "./metric/check-in-metric.controller";
import { checkInValidateController } from "./validate/validate-check-in.controller";

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);
  app.post(AppRoutesEnum.CHECK_IN, checkInController);
  app.get(AppRoutesEnum.CHECK_IN_HISTORY, checkInHistoryController);
  app.get(AppRoutesEnum.CHECK_IN_METRIC, checkInMetricController);
  app.patch(AppRoutesEnum.CHECK_IN_VALIDATE,{onRequest:[verifyUserRole('ADMIN')]}, checkInValidateController);
}
