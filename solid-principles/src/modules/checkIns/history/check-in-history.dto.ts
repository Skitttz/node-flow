import { z } from "zod";

const checkInHistoryBodySchema = z.object({
  page: z.coerce.number().min(1).default(1),
});

export { checkInHistoryBodySchema };
