import { z } from "zod";

const searchGymQuerySchema = z.object({
  searchTerm: z.string(),
  page: z.coerce.number().min(1).default(1),
});

export { searchGymQuerySchema };
