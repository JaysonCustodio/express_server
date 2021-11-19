"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../config/client"));
class PostModel {
    static createPost(user_id, post) {
        return client_1.default
            .table("posts")
            .insert(Object.assign(Object.assign({}, post), { user_id, created_date: new Date().toISOString(), updated_date: new Date().toISOString() }))
            .run();
    }
    static getAllPosts() {
        return client_1.default.table("posts").run();
    }
    static getAllUserPosts(user_id) {
        return client_1.default.table("posts").getAll(user_id, { index: "user_id" }).run();
    }
    static getUserPost(user_id, post_id) {
        return client_1.default
            .table("posts")
            .getAll(user_id, { index: "user_id" })
            .filter({ id: post_id })
            .run();
    }
    static updateUserPost(user_id, post_id, post) {
        return client_1.default
            .table("posts")
            .getAll(user_id, { index: "user_id" })
            .filter({ id: post_id })
            .update(Object.assign(Object.assign({}, post), { updated_date: new Date().toISOString() }))
            .run();
    }
    static deleteUserPost(user_id, post_id) {
        return client_1.default
            .table("posts")
            .getAll(user_id, { index: "user_id" })
            .filter({ id: post_id })
            .delete()
            .run();
    }
}
exports.default = PostModel;
PostModel.getPost = (post_id) => client_1.default.table("posts").get(post_id).run();
