import express from 'express';

import Carrito from '../services/carrito.js';

const routerCarrito = express.Router()

routerCarrito.get("/", (req, res, next) => {
  const producto = new Carrito();
  producto.readAll().then((obj) =>{
    res.send(obj)
	})
});

routerCarrito.get("/:id", (req, res, next) => {
	const {id} = req.params 
  const producto = new Carrito();
  producto.readOne(id).then((obj) => {
    res.send(obj);
  });
});

routerCarrito.post('/', (req, res) => {
	const { timestampCarrito ,producto} = req.body
	const  {id, timestamp, nombre, descripcion, codigo, foto, precio, stock}  = producto
	// {
	// 	"timestampCarrito":1631072864163,
	// 	"producto":{
	// 		"timestamp": 1631072864163,
	// 		"nombre": "reg",
	// 		"descripcion": "descripcion",
	// 		"codigo": "codigo",
	// 		"foto": "foto",
	// 		"precio": 20,
	// 		"stock": 30
	// }}
	const file = new Carrito()
	file.createCarrito({
		  timestampCarrito:timestampCarrito,
			producto:{
			timestamp: timestamp,
			nombre: nombre,
			descripcion: descripcion,
			codigo: codigo,
			foto: foto,
			precio: precio,
			stock: stock,
	}}).then(maxId =>{res.send(maxId)})
})

routerCarrito.put('/:idCarrito', (req, res) => {

	const { timestampCarrito ,producto} = req.body
	const  {id, timestamp, nombre, descripcion, codigo, foto, precio, stock}  = producto
	const {idCarrito} = req.params 
	const idCarr = idCarrito
	const carrito = new Carrito();
	carrito.update(idCarr, {
	timestampCarrito:timestampCarrito,
		producto:{
		timestamp: timestamp,
		nombre: nombre,
		descripcion: descripcion,
		codigo: codigo,
		foto: foto,
		precio: precio,
		stock: stock,
	}}).catch(data => res.json({
		idProductoEditado:id
	
	}))		
})

routerCarrito.delete('/:id', (req, res) => {
	const {id} = req.params 
	const producto = new Carrito();
	producto.deleteCarrito(id)
	res.json({
		ProductoConIdBorrado:id,
	})
})


export default routerCarrito