import 'dotenv/config';
import { Knex, default as setupKnex } from "knex";
import { env } from './env';

const connectionDatabase = env.DATABASE_CLIENT === 'sqlite' ? {filename: env.DATABASE_URL} : env.DATABASE_URL;

const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: connectionDatabase,
  useNullAsDefault: true,
  migrations:{
    extension: 'ts',
    directory: './db/migrations',
  },
}

const knex = setupKnex(config);

export { config, knex };

