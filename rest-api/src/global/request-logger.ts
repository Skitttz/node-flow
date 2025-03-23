import { FastifyInstance } from 'fastify';

function getMethodColor(method: string): string {
  const colors: Record<string, string> = {
    GET: '\x1b[32m GET\x1b[0m',
    POST: '\x1b[34m POST\x1b[0m',
    PUT: '\x1b[33m PUT\x1b[0m',
    DELETE: '\x1b[31m DELETE\x1b[0m',
    PATCH: '\x1b[35m PATCH\x1b[0m'
  };
  return colors[method] || `\x1b[37m❓ ${method}\x1b[0m`; 
}

function getStatusColor(status: number): string {
  if (status >= 500) return `\x1b[31m${status}\x1b[0m`;
  if (status >= 400) return `\x1b[33m${status}\x1b[0m`;
  if (status >= 300) return `\x1b[36m${status}\x1b[0m`;
  if (status >= 200) return `\x1b[32m${status}\x1b[0m`;
  return `\x1b[37m❔ ${status} - Unknown status\x1b[0m`;
}

function setupRequestLogger(app: FastifyInstance) {
  app.addHook('onResponse', (request, reply, done) => {
    const sessionId = request.cookies.sessionId; 

    const methodColor = getMethodColor(request.method);
    const statusColor = getStatusColor(reply.statusCode);
    const url = request.url;

    console.log(`
    -------------------------------
    🌐 [${statusColor}] ${methodColor} ${url} 
    👤 Session ID: ${sessionId ?? "unavailable"}
    -------------------------------
    `);

    done();
  });

}

export { setupRequestLogger };
