import 'dotenv/config';
import { knex as setupKnex } from "knex";
import { env } from './env';


const config = {
  client: 'sqlite',
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations:{
    extensions: 'ts',
    directory: './db/migrations',
  },
}

const knex = setupKnex(config);

export { config, knex };

