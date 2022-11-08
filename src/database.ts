import dotenv from 'dotenv';

import { Pool } from 'pg';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV,
  POSTGRES_PORT
} = process.env;

const client = new Pool({
  user: POSTGRES_USER,
  host: POSTGRES_HOST,
  database: ENV === 'dev' ? POSTGRES_DB : POSTGRES_TEST_DB,
  password: POSTGRES_PASSWORD,
  port: parseInt(POSTGRES_PORT as string, 10)
});

export default client;
