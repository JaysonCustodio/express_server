"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//for testing only
const bluebird_1 = __importDefault(require("bluebird"));
const dotenv_1 = __importDefault(require("dotenv"));
const rethinkdbdash_1 = __importDefault(require("rethinkdbdash"));
const http_1 = __importDefault(require("http"));
const random = require("random-name");
const password = require("secure-random-password");
const randomTitle = require("random-title");
dotenv_1.default.config();
const { RETHINKDB_DB, RETHINKDB_HOST } = process.env;
const r = rethinkdbdash_1.default({ servers: RETHINKDB_HOST });
const generateUser = async (num) => {
    while (num != 0) {
        let fname = random.first();
        let lname = random.last();
        let uname = fname.charAt(0) + lname;
        await r
            .db(RETHINKDB_DB)
            .table("users")
            .insert({
            id: r.uuid(),
            first_name: fname,
            last_name: lname,
            username: uname,
            password: password.randomPassword(),
            created_at: new Date(),
            updated_at: new Date(),
        })
            .run();
        num -= 1;
    }
};
const generatePost = async () => {
    const users = (await r.db(RETHINKDB_DB).table("users").run());
    users.map(async (data) => { });
    bluebird_1.default.mapSeries(users, async (user) => {
        for (let i = 0; i < 3; i++) {
            await r
                .db(RETHINKDB_DB)
                .table("posts")
                .insert({
                id: r.uuid(),
                user_id: user.id,
                title: randomTitle({ words: 3 }),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            });
        }
    });
};
const httpLogs = (status) => {
    console.log(http_1.default.STATUS_CODES[`${status}`]);
};
//generateUser(5);
generatePost();
console.log("done");
