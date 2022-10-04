import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
});

const User = new Schema({
  _id: {
    type: String,
  },
  email: {
    type: String,
    default: "",
    required: true,
  },
  password: {
    type: String,
    default: "",
    required: true,
  },
  name: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  phone:{
    type: Number,
  },
  image: {
    type: String,
    default: "",
    
  },
  admin:{
    type:Boolean,
    default:false
  }
});

export const UserModel = mongoose.model("User", User);
