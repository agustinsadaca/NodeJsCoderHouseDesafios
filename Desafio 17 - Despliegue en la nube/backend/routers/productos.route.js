import express from 'express';

import Producto from '../services/producto.js';

const routerProducto = express.Router()

/* -------------------------------------------------------------------------- */
/*                                  Productos                                 */
/* -------------------------------------------------------------------------- */

routerProducto.get("/",(req, res, next) => {
  const producto = new Producto();
  producto.readAll().then((obj) =>{
    
    res.send(obj)
	})
});

routerProducto.get("/:id", (req, res, next) => {
	console.log(req.isAuthenticated());
 
	const {id} = req.params 
  const producto = new Producto();
  producto.readOne(id).then((obj) => {
    res.send(obj);
  });
});

routerProducto.post('/', (req, res) => {
	const  { timestamp, nombre, descripcion, codigo, foto, precio, stock, admin}  = req.body
	// {
  //   "timestamp": 1631072864163,
  //   "nombre": "regla",
  //   "descripcion": "elemento de medicion",
  //   "codigo": 1515,
  //   "foto": "https://cdn1.iconfinder.com/data/icons/education-filled-outline-8/64/Education-Filled_2-512.png",
  //   "precio": 14,
  //   "stock": 14
  // }
	if (admin){

	const file = new Producto()
	file.createProducto({
			
			timestamp: timestamp,
			nombre: nombre,
			descripcion: descripcion,
			codigo: codigo,
			foto: foto,
			precio: precio,
			stock: stock,
	}).then(maxId => res.redirect("/api/productos/" + maxId))
 }else{
	 res.send({error : -1, descripcion: 'ruta api/productos método post/save no autorizada'})
 }
})


routerProducto.put('/:id', (req, res) => {

	const  { timestamp, nombre, descripcion, codigo, foto, precio, stock,admin}  = req.body
	const {id} = req.params 
	if (admin){
	const producto = new Producto();
  producto.update(id, { timestamp, nombre, descripcion, codigo, foto, precio, stock}).catch(data => res.json({
		idProductoEditado:id
	
	}))		
	}else{
		res.send({error : -2, descripcion: 'ruta api/productos método put/update no autorizada'})
	}
})

routerProducto.delete('/:id', (req, res) => {
	const {id} = req.params 
	const {admin}  = req.body
	if (admin){
	const producto = new Producto();
	producto.deleteProducto(id)
	res.json({
		ProductoConIdBorrado:id,
	})
	}else{
		res.send({error : -3, descripcion: 'ruta api/productos método delete no autorizada'})
	}
})

export default routerProducto