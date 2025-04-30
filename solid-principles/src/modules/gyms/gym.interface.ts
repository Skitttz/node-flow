import type { Gym } from "@prisma/client";

interface GymServiceRequest {
  title: string;
  description: string;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface GymServiceResponse {
  gym: Gym;
}

export type { GymServiceRequest, GymServiceResponse };
