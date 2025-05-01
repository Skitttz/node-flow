import { z } from "zod";

const nearbyGymsQuerySchema = z.object({
  userLatitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 90;
  }),
  userLongitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 180;
  }),
});

export { nearbyGymsQuerySchema };
