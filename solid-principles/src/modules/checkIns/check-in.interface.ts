import type { CheckIn } from "@prisma/client"

interface CheckInServiceRequest {
  userId: string
  gymId: string
  userLatitude: number,
  userLongitude: number,
}

interface CheckInServiceResponse {
  checkIn: CheckIn
}

export type { CheckInServiceRequest, CheckInServiceResponse }
