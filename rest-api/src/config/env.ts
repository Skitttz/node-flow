import { config } from "dotenv";
import { z } from 'zod';

if(process.env.NODE_ENV === 'test'){
  config({path: '.env.test', override: true});
} else {
  config({override: true});
}

const envSchema = z.object({
  NODE_ENV: z.enum(['dev','test','prod']).default('prod'),
  DATABASE_CLIENT: z.enum(['sqlite','pg']),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  PORT: z.coerce.number().default(3333),
});

export const _env = envSchema.safeParse(process.env)
if(_env.success === false){
  console.error('Invalid env variables', _env.error.format());
  throw new Error('Invalid env variables.')
}

export const env = _env.data;