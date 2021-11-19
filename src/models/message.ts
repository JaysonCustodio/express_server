import twilioClient from "../config/twilio";
import { MessageListInstanceCreateOptions } from "twilio/lib/rest/api/v2010/account/message";

export default class messageModel {
  static createMeasage = async (message: MessageListInstanceCreateOptions) =>
    await twilioClient.messages.create(message);
}
