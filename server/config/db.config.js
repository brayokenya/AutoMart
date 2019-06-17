import { Pool } from 'pg';
import appVariables from './app.config';

const connectionString = appVariables.dbUrl;

const pool = new Pool({ connectionString });


export default pool;