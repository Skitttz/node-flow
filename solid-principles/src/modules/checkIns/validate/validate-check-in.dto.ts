import { z } from "zod";

const validateCheckInParamsSchema = z.object({
  checkInId: z.string().uuid(),
});

export { validateCheckInParamsSchema };
