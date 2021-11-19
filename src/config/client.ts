import rethinkdbdash from "rethinkdbdash";
import dotenv from "dotenv";

dotenv.config();
const { RETHINKDB_HOST, RETHINKDB_DB }: any = process.env;

export default rethinkdbdash({ db: RETHINKDB_DB, servers: RETHINKDB_HOST });
