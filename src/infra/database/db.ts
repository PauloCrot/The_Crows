import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  host: 'localhost',
  port: 5433,
  user: 'admin',
  password: 'adminpassword',
  database: 'lojadb'
});
