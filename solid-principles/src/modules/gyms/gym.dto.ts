import { z } from "zod";

const gymBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  phone: z.string().optional(),
  latitude: z.number().refine((value) => {
    return Math.abs(value) <= 90;
  }),
  longitude: z.number().refine((value) => {
    return Math.abs(value) <= 180;
  }),
});

export { gymBodySchema };
