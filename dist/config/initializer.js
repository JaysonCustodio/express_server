"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuidv4_1 = require("uuidv4");
const interfaces_1 = require("../pg/schema/interfaces");
const client_1 = __importDefault(require("./client"));
exports.default = async () => {
    const personId = uuidv4_1.uuid();
    await client_1.default.db("dental").table("person").insert({
        id: personId,
        firstname: "Assistant",
        lastname: "assistant",
        email: "jcustodio123@gmail.com",
        address: "Nasipit, Talamban",
        mobileno: "09225994182",
        nationality: "filipino",
        dateofbirth: "1996-10-21",
        religion: "catholic",
        sex: "Male",
        telnumber: "NA",
    }).run();
    await client_1.default.db("dental").table("user").insert({
        personId,
        username: "assistant",
        password: "assistant",
        role: interfaces_1.ERole.Assistant
    }).run();
};
