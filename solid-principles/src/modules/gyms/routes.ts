import { verifyJWT } from "@@app/middleware/verify-jwt";
import { verifyUserRole } from "@@app/middleware/verify-user-role";
import { AppRoutesEnum } from "@@app/shared/routes";
import type { FastifyInstance } from "fastify";
import { gymController } from "./gym.controller";
import { nearbyGymController } from "./nearby/nearby-gyms.controller";
import { searchGymController } from "./search/search-gyms.controller";

export async function gymRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);
  app.post(AppRoutesEnum.GYM,{onRequest:[verifyUserRole('ADMIN')]}, gymController);
  app.get(AppRoutesEnum.GYM_SEARCH, searchGymController);
  app.get(AppRoutesEnum.GYM_NEARBY, nearbyGymController);
}
