import { IncomingMessage, ServerResponse } from 'http';


export interface CustomRequest extends IncomingMessage {
  query?: { search?: string };
  params?: Record<string, string> | { id: string }; // Permitir tanto tipos genéricos quanto específicos
  body?: Record<string, any> | null;
}

export async function json(req: CustomRequest, res: ServerResponse): Promise<void> {
  const buffers: Buffer[] = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const body = Buffer.concat(buffers).toString();

  try {
    req.body = body ? JSON.parse(body) : null;
  } catch {
    req.body = null;
  }

  res.setHeader("Content-Type", "application/json");
}
