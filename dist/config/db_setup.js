"use strict";
"use-strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = __importDefault(require("./client"));
dotenv_1.default.config();
const { RETHINKDB_DB } = process.env;
const initializer = async () => {
    //get all existing db
    const dblist = await client_1.default.dbList().run();
    //create jaydb if not exist
    if (!dblist.includes(RETHINKDB_DB))
        await client_1.default.dbCreate(RETHINKDB_DB).run();
    //get all existing tables
    const tablelist = await client_1.default.tableList().run();
    //create users table if not exist
    if (!tablelist.includes("users"))
        await client_1.default.tableCreate("users").run();
    if (!tablelist.includes("logins"))
        await client_1.default.tableCreate("logins").run();
    //create posts table if not exist
    // if (!tablelist.includes("posts")) await client.tableCreate("posts").run();
    //get all index of posts
    // const post_indexes = await client.table("posts").indexList().run();
    //create index user_id if not exist
    // if (!post_indexes.includes("user_id"))
    // await client.table("posts").indexCreate("user_id").run();
};
exports.default = initializer;
