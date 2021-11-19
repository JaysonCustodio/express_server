import { Twilio } from "twilio";

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN }: any = process.env;

export default new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
