import { z } from "zod";

const profileUserBodySchema = z.object({
  userID: z.string(),
})

export { profileUserBodySchema };
