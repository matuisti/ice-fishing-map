import { Pool } from 'pg';
import * as dotenv from 'dotenv'

dotenv.config();

const databaseConfig = { connectionString: process.env.DATABASE_URL };
const pool = new Pool(databaseConfig);

export { pool };