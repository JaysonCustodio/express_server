"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = require("twilio");
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
exports.default = new twilio_1.Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
