import mongoose from "mongoose";

const Schema = mongoose.Schema({
  timestamp_message: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    max: 100,
  },
  message: {
    type: String,
    required: true,
    max: 100,
  },
});

export const MessageModel = mongoose.model("message", Schema);
