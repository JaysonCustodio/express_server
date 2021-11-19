import { Pool } from "pg";

export default new Pool({
  max: 20,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGUSER,
  port: Number(process.env.PGPORT),
});
