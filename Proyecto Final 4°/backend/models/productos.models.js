import mongoose from "mongoose";

const Schema = mongoose.Schema({
  timestamp: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
    max: 100,
  },
  description: {
    type: String,
    required: true,
    max: 100,
  },
  code: {
    type: Number,
  },
  image: {
    type: String,
    required: true,
    max: 100,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
  },
});

export const ProductosModel = mongoose.model("productos", Schema);
