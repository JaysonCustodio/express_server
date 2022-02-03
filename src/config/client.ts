import rethinkdbdash from "rethinkdbdash";
import dotenv from "dotenv";

dotenv.config();
const { RETHINKDB_HOST = "127.0.0.1", RETHINKDB_DB ="dental" }: any = process.env;

export default rethinkdbdash({ 
    db: RETHINKDB_DB, 
    servers: RETHINKDB_HOST
});
