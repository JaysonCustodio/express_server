"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../controllers/user"));
const user = (server) => {
    server.post("/myapp", user_1.default.initializeConnection);
    server.post("/auth", user_1.default.loginUser);
    server.post("/user", user_1.default.createUser),
        server.get("/user/:id", user_1.default.getUser),
        server.get("/users", user_1.default.getAllUser);
    server.put("/user/:id", user_1.default.updateUser);
    server.del("/user/:id", user_1.default.deleteUser);
};
exports.default = user;
