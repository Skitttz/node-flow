import { z } from "zod";

const checkInMetricBodySchema = z.object({
  searchTerm: z.string(),
  page: z.coerce.number().min(1).default(1),
});

export { checkInMetricBodySchema };
