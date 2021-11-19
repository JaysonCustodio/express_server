"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_config_1 = __importDefault(require("../../config/pg_config"));
const main = async () => {
    try {
        const client = await pg_config_1.default.connect();
        const { rows: roles } = await client.query("select * from roles");
        const { rows: user_roles } = await client.query("select * from user_roles");
        const { rows: users } = await client.query("select * from users");
        console.log("@@@ roles ", roles);
        console.log("@@@ user_roles", user_roles);
        console.log("@@@ users ", users);
        client.release();
    }
    catch (error) {
        console.log("@@@ error : ", error);
    }
};
exports.default = main;
