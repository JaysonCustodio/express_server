"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../config/client"));
const { RETHINKDB_DB } = process.env;
class UserModel {
    static createUser(user) {
        return client_1.default
            .table("users")
            .insert(Object.assign(Object.assign({}, user), { created_date: new Date().toISOString(), updated_date: new Date().toISOString() }))
            .run();
    }
    static loginUser(loginCredentials) {
        return client_1.default.table("logins").filter(loginCredentials).run();
    }
    static getUser(id) {
        return client_1.default.table("users").get(id).run();
    }
    static getAllUsers() {
        return client_1.default.db(RETHINKDB_DB).table("users").run();
    }
    static updateUser(id, new_user) {
        return client_1.default
            .table("users")
            .get(id)
            .update(Object.assign(Object.assign({}, new_user), { updated_date: new Date().toISOString() }))
            .run();
    }
    static deleteUser(id) {
        return client_1.default.table("users").get(id).delete().run();
    }
}
exports.default = UserModel;
