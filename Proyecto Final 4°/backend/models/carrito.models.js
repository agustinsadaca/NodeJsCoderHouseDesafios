import mongoose from "mongoose";

const Schema = mongoose.Schema;
const Carrito = new Schema({
  timestampCarrito: {
    type: Number,
    required: true,
  },
  productos: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "productos" },
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
        required: true,
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
      amount: { 
        type: Number, 
        required: true },
    },
  ],
});

export const CarritoModel = mongoose.model("carrito", Carrito);
