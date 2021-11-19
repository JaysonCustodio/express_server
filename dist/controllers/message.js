"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = __importDefault(require("../models/message"));
const { TWILIO_PHONE_NUMBER, MY_NUMBER } = process.env;
const twilioNumber = TWILIO_PHONE_NUMBER;
const myNumber = MY_NUMBER;
const MessageController = {
    createMeasage: async () => {
        const message = {
            from: twilioNumber,
            to: myNumber,
            body: "this is a motherfucking text message, lol!",
        };
        return message_1.default.createMeasage(message);
    },
};
exports.default = MessageController;
