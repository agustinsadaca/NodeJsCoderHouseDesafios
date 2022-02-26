import mongoose from 'mongoose'

const Schema = mongoose.Schema({
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
		required: true
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
})

export const ProductosModel = mongoose.model('productos', Schema)
