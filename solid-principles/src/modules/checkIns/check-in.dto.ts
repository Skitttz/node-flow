import { z } from "zod";

const checkInParamsBodySchema = z.object({
  gymId: z.string().uuid(),
});

const checkInBodySchema = z.object({
  latitude: z.number().refine((value) => {
    return Math.abs(value) <= 90;
  }),
  longitude: z.number().refine((value) => {
    return Math.abs(value) <= 180;
  }),
});

export { checkInBodySchema, checkInParamsBodySchema };
