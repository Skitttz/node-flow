import type { CheckIn } from "@prisma/client";

interface ValidateCheckInServiceRequest {
  checkInId: string;
}

interface ValidateCheckInServiceResponse {
  checkIn: CheckIn;
}

export type { ValidateCheckInServiceRequest, ValidateCheckInServiceResponse };
