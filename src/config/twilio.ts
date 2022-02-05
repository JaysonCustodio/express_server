import { Twilio } from "twilio";

const { TWILIO_ACCOUNT_SID = "AC4b9211e51e6ad69c4684f7e2671451bb", TWILIO_AUTH_TOKEN = "e797f047a5067f9ca69cc9be5f1c9e4f" }: any = process.env;

export default new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
