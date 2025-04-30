import type { Gym } from "@prisma/client";

interface SearchGymsServiceRequest {
  searchTerm: string;
  page: number;
}

interface SearchGymsServiceResponse {
  gyms: Gym[];
}

export type { SearchGymsServiceRequest, SearchGymsServiceResponse };
