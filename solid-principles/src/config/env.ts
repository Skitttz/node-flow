import { z } from 'zod';


const envSchema = z.object({
  NODE_ENV:  z.enum(['development', 'test', 'production']).default('production'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
});

export const _env = envSchema.safeParse(process.env)

if(_env.success === false){
  console.error('Invalid env variables', _env.error.format());
  throw new Error('Invalid env variables.')
}

export const env = _env.data;