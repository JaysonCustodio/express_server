"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = require("twilio");
const { TWILIO_ACCOUNT_SID = "AC4b9211e51e6ad69c4684f7e2671451bb", TWILIO_AUTH_TOKEN = "e797f047a5067f9ca69cc9be5f1c9e4f" } = process.env;
exports.default = new twilio_1.Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
