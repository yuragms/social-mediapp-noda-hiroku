import mongoose from "mongoose";
const MessageShema = mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const MessageModel = mongoose.model("Message", MessageShema);
export default MessageModel;
