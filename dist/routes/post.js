"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_1 = __importDefault(require("../controllers/post"));
const post = (server) => {
    server.get("/post/:id", post_1.default.getPost),
        server.get("/posts", post_1.default.getAllPosts),
        server.get("/user/:user_id/posts", post_1.default.getAllUserPosts),
        server.get("/user/:user_id/post/:id", post_1.default.getUserPost),
        server.put("/user/:user_id/post/:id", post_1.default.updateUserPost),
        server.del("/user/:user_id/post/:id", post_1.default.deleteUserPost),
        server.post("/user/:user_id/post", post_1.default.createPost);
};
exports.default = post;
