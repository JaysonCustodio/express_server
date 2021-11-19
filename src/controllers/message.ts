import {
  MessageListInstanceCreateOptions,
  MessageInstance,
} from "twilio/lib/rest/api/v2010/account/message";
import messageModel from "../models/message";

const { TWILIO_PHONE_NUMBER, MY_NUMBER }: any = process.env;

const twilioNumber = TWILIO_PHONE_NUMBER;
const myNumber = MY_NUMBER;

const MessageController = {
  createMeasage: async (): Promise<MessageInstance> => {
    const message: MessageListInstanceCreateOptions = {
      from: twilioNumber,
      to: myNumber,
      body: "this is a motherfucking text message, lol!",
    };
    return messageModel.createMeasage(message);
  },
};
export default MessageController;
