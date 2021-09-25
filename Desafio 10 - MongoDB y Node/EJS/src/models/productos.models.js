import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    dni: {
        type: Number,
        index: true,
        required: true
    },
    curso: {
        type: String,
        required: true
    },
    nota: {
        type: Number,
        required: true
    },
})

export const ProductosModel = mongoose.model('Productos', Schema)