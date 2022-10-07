import mongoose from "mongoose";

const Schema = mongoose.Schema;
const Carrito = new Schema({
  _id: {
    type: String,
    required: true,
  },
  timestampCarrito: {
    type: Number,
    required: true,
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

        max: 100,
      },
      code: {
        type: Number,
      },
      image: {
        type: String,

        max: 100,
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

export const CarritoModel = mongoose.model("carrito", Carrito);
