import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
});

//create the table if it doesn't exist
export async function initDB() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS public.users (
      id SERIAL PRIMARY KEY,
      "name" VARCHAR NOT NULL,
      age INT NOT NULL,
      address JSONB,
      additional_info JSONB
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log("Table 'users' is ready in the database.");
  } catch (error) {
    console.error("Error creating users table:", error);
  }
}

export default pool;
