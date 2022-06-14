/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

if (process.env.MODE === 'PROD') {
  console.log('Production mode');
  db.ssl = { rejectUnauthorized: false };
}

db.query('SELECT NOW()', (err, res) => {
  res
    ? console.log(
        `connect to database ${process.env.DATABASE_NAME} sucessfully\nhappy hacking !`
      )
    : console.log(
        `failed to connect to database ${process.env.DATABASE_NAME}: ${err}`
      );
});

export default db;
