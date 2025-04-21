import { z } from "zod";

export const registerBodySchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string().min(6, {message: "The password must be at least 6 characters"}),
})