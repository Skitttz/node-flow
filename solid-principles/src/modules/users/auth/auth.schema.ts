import { z } from "zod";

const authUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export { authUserBodySchema };
