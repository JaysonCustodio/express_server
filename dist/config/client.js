"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rethinkdbdash_1 = __importDefault(require("rethinkdbdash"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { RETHINKDB_HOST = "127.0.0.1", RETHINKDB_DB = "dental" } = process.env;
exports.default = rethinkdbdash_1.default({
    db: RETHINKDB_DB,
    servers: RETHINKDB_HOST
});
