import type { CheckIn } from "@prisma/client"

interface CheckInsHistoryServiceRequest {
  userID: string,
  page:number,
}

interface CheckInsHistoryServiceResponse {
  checkInsHistory: CheckIn[]
}

export type { CheckInsHistoryServiceRequest, CheckInsHistoryServiceResponse }
