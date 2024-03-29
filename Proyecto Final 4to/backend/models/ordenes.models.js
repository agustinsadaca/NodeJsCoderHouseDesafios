import mongoose from "mongoose";

const Schema = mongoose.Schema;
const Orden = new Schema({
  _id: {
    type: String,
    required: true,
  },
  idCliente: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now,
  },
  prods: [
    {
      _id: { type: String },
      name: {
        type: String,
        required: true,
        max: 100,
      },
      description: {
        type: String,
      },
      code: {
        type: Number,
      },
      image: {
        type: String,
      },
      price: {
        type: Number,
      },
      stock: {
        type: Number,
      },
      amount: {
        type: Number,
      },
    },
  ],
});

export const OrdenModel = mongoose.model("orden", Orden);
