import type { Gym } from "@prisma/client"

interface NearbyGymsServiceRequest {
  userLatitude: number
  userLongitude: number,
}

interface NearbyGymsServiceResponse {
  gyms: Gym[]
}

export type { NearbyGymsServiceRequest, NearbyGymsServiceResponse }
