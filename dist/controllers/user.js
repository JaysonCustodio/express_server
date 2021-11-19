"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const user_1 = __importDefault(require("../models/user"));
const UserController = {
    initializeConnection: (req, res) => {
        console.log("initialize connection");
        setTimeout(() => {
            res.send({
                message: http_1.default.STATUS_CODES["200"],
            });
        }, 3000);
    },
    getAllUser: async (req, res) => {
        try {
            const result = await user_1.default.getAllUsers();
            res.send(result ? result : { message: http_1.default.STATUS_CODES["404"] });
        }
        catch (error) {
            res.status(500);
            res.send({
                message: http_1.default.STATUS_CODES["500"],
            });
        }
    },
    loginUser: async (req, res) => {
        try {
            const login = req.body;
            const result = await user_1.default.loginUser(login);
            res.send(
            //@ts-ignore
            !!result.length
                ? { message: http_1.default.STATUS_CODES["200"] }
                : { message: http_1.default.STATUS_CODES["404"] });
        }
        catch (error) {
            res.status(500);
            res.send({
                message: http_1.default.STATUS_CODES["500"],
            });
        }
    },
    getUser: async (req, res) => {
        try {
            const result = await user_1.default.getUser(req.params.id);
            res.send(result ? result : { message: http_1.default.STATUS_CODES["404"] });
        }
        catch (error) {
            res.status(500);
            res.send({
                message: http_1.default.STATUS_CODES["500"],
            });
        }
    },
    createUser: async (req, res) => {
        try {
            const { errors } = await user_1.default.createUser(req.body);
            if (errors) {
                res.status(404);
            }
            res.send({
                message: errors ? http_1.default.STATUS_CODES["404"] : http_1.default.STATUS_CODES["200"],
            });
        }
        catch (error) {
            res.status(500);
            res.send({
                message: http_1.default.STATUS_CODES["500"],
            });
        }
    },
    updateUser: async (req, res) => {
        try {
            const { replaced } = await user_1.default.updateUser(req.params.id, req.body);
            res.send({
                meesage: replaced ? http_1.default.STATUS_CODES["200"] : http_1.default.STATUS_CODES["404"],
            });
        }
        catch (error) {
            res.status(500);
            res.send({
                message: http_1.default.STATUS_CODES["500"],
            });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { deleted } = await user_1.default.deleteUser(req.params.id);
            res.send({
                message: deleted ? http_1.default.STATUS_CODES["200"] : http_1.default.STATUS_CODES["404"],
            });
        }
        catch (error) {
            res.status(500);
            res.send({
                message: http_1.default.STATUS_CODES["500"],
            });
        }
    },
};
exports.default = UserController;
