"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = __importDefault(require("../config/twilio"));
class messageModel {
}
exports.default = messageModel;
messageModel.createMeasage = async (message) => await twilio_1.default.messages.create(message);
