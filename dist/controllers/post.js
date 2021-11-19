"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const post_1 = __importDefault(require("../models/post"));
const user_1 = __importDefault(require("../models/user"));
const PostController = {
    getPost: async ({ params: { id } }, res) => {
        try {
            const result = await post_1.default.getPost(id);
            res.send(result ? result : { message: http_1.default.STATUS_CODES["404"] });
        }
        catch (error) {
            res.status(500);
            res.send({
                message: http_1.default.STATUS_CODES["500"],
            });
            throw error;
        }
    },
    createPost: async (req, res) => {
        try {
            const { errors } = await post_1.default.createPost(req.params.user_id, req.body);
            res.send({
                message: errors ? http_1.default.STATUS_CODES["500"] : http_1.default.STATUS_CODES["200"],
            });
        }
        catch (error) {
            console.log(error);
            res.status(500);
            res.send({
                message: http_1.default.STATUS_CODES["500"],
            });
        }
    },
    getAllPosts: async (req, res) => {
        try {
            const result = await post_1.default.getAllPosts();
            res.send(result ? result : { message: http_1.default.STATUS_CODES["404"] });
        }
        catch (error) {
            res.status(500);
            res.send({
                message: http_1.default.STATUS_CODES["500"],
            });
            throw error;
        }
    },
    getAllUserPosts: async (req, res) => {
        try {
            const user_result = await user_1.default.getUser(req.params.user_id);
            if (!user_result)
                return res.send({ message: http_1.default.STATUS_CODES["404"] });
            const result = await post_1.default.getAllUserPosts(req.params.user_id);
            res.send(result ? result : { message: http_1.default.STATUS_CODES["404"] });
        }
        catch (error) {
            res.status(500);
            res.send({
                message: http_1.default.STATUS_CODES["500"],
            });
        }
    },
    getUserPost: async (req, res) => {
        try {
            const user_result = await user_1.default.getUser(req.params.user_id);
            if (!user_result)
                return res.send({ message: http_1.default.STATUS_CODES["404"] });
            const result = await post_1.default.getUserPost(req.params.user_id, req.params.id);
            if (result.length === 0)
                return res.send({ message: http_1.default.STATUS_CODES["404"] });
            res.send(result);
        }
        catch (error) {
            console.log(error);
            res.status(500);
            res.send({
                message: http_1.default.STATUS_CODES["500"],
            });
        }
    },
    updateUserPost: async (req, res) => {
        try {
            const { replaced } = await post_1.default.updateUserPost(req.params.user_id, req.params.id, req.body);
            res.send({
                message: replaced ? http_1.default.STATUS_CODES["200"] : http_1.default.STATUS_CODES["404"],
            });
        }
        catch (error) {
            res.status(500);
            res.send({
                message: http_1.default.STATUS_CODES["500"],
            });
            throw error;
        }
    },
    deleteUserPost: async (req, res) => {
        try {
            const { deleted } = await post_1.default.deleteUserPost(req.params.user_id, req.params.id);
            res.send({
                message: deleted ? "Data deleted in the db" : http_1.default.STATUS_CODES["404"],
            });
        }
        catch (error) {
            console.log(error);
            res.status(500);
            res.send({
                message: http_1.default.STATUS_CODES["500"],
            });
        }
    },
};
exports.default = PostController;
