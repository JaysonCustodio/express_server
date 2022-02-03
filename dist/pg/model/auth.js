"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = __importDefault(require("../../config/client"));
class AuthModel {
    static async signUp(person) {
    }
    static async signIn({ username, password }) {
        var _a;
        try {
            const user = await client_1.default.table("user").filter({ username }).run();
            if (!user.length)
                return "username not exist";
            if (password !== user[0].password)
                return "invalid password";
            const token = jsonwebtoken_1.default.sign({ username, user_id: (_a = user[0]) === null || _a === void 0 ? void 0 : _a.id }, "MIKEY", {
                expiresIn: "3h",
            });
            const person = await client_1.default
                .table("person")
                .filter({ id: user[0].personId })
                .run();
            return Object.assign(Object.assign({}, person[0]), { token: token, roles: [user[0].role] });
        }
        catch (error) {
            return error;
        }
    }
}
exports.default = AuthModel;
