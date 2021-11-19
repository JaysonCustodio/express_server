"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const interceptor = (req, res, next) => {
    const token = req === null || req === void 0 ? void 0 : req.headers["access-token"];
    if (!token)
        return res.send({ message: "token is required", success: false });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
    }
    catch (error) {
        return res.send({ message: "Invalid Token", success: false });
    }
    return next();
};
exports.default = interceptor;
