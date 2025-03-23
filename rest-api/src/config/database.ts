import 'dotenv/config';
import { default as setupKnex } from "knex";
import { env } from './env';

const connectionDatabase = env.DATABASE_CLIENT === 'sqlite' ? {filename: env.DATABASE_URL} : env.DATABASE_URL;

const config = {
  client: 'sqlite',
  connection: connectionDatabase,
  useNullAsDefault: true,
  migrations:{
    extensions: 'ts',
    directory: './db/migrations',
  },
}

const knex = setupKnex(config);

export { config, knex };

