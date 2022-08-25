import mongoose from 'mongoose';

const Schema = mongoose.Schema
const Carrito = new Schema({
  timestampCarrito: {
    type: Number,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  productos: [{
    timestamp: {
      type: Number,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
      max: 100,
    },
    descripcion: {
      type: String,
      required: true,
      max: 100,
    },
    codigo: {
      type: Number,
      required: true,
    },
    foto: {
      type: String,
      required: true,
      max: 100,
    },
    precio: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
  }]
});

export const CarritoModel = mongoose.model("carrito", Carrito);
