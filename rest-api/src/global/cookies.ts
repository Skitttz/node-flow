import { CookieSerializeOptions } from "@fastify/cookie"

function generateCookieConfig (path?: string): CookieSerializeOptions {
  return {
    path: path ?? "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7  // Max Age in Fastify is in seconds
  }
}


export { generateCookieConfig }
