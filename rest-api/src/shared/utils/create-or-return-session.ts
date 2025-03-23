import { randomUUID } from "crypto";

const createOrReturnSessionId = (sessionId?: string): string => {
  return sessionId ?? randomUUID();
};

export { createOrReturnSessionId };
