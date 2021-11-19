"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("../model/auth"));
const AuthController = {
    siginUp: async ({ body }, res) => {
        const result = await auth_1.default.signUp(body);
        res.json(result);
    },
    login: async ({ body }, res) => {
        const result = await auth_1.default.signIn(body);
        res.json(result);
    },
};
exports.default = AuthController;
