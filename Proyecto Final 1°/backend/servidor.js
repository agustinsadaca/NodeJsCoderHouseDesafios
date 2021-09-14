const express = require("express");
const cors = require('cors');
const { Router } = express //Nueva linea
const { Producto } = require("./productos");
const { Carrito } = require("./carrito");

const app = express();
app.use(cors({
  origin: '*'
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const routerProducto= new Router() 
const routerCarrito= new Router() 
/* -------------------------------------------------------------------------- */
/*                                  Productos                                 */
/* -------------------------------------------------------------------------- */

routerProducto.get("/", (req, res, next) => {
  const producto = new Producto();
  producto.getAll().then((obj) =>{
    
    res.send(obj)
	})
});

routerProducto.get("/:id", (req, res, next) => {
 
	const {id} = req.params 
  const producto = new Producto();
  producto.getById(id).then((obj) => {
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
	file.save({
			
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

app.get('/', (req, res) => {
	
	res.sendFile(__dirname + '/index.html')
})
routerProducto.put('/:id', (req, res) => {

	const  { timestamp, nombre, descripcion, código, foto, precio, stock,admin}  = req.body
	const {id} = req.params 
	if (admin){
	const producto = new Producto();
  producto.updateById(id, { timestamp, nombre, descripcion, código, foto, precio, stock}).catch(data => res.json({
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
	producto.deleteById(id)
	res.json({
		ProductoConIdBorrado:id,
	})
	}else{
		res.send({error : -3, descripcion: 'ruta api/productos método delete no autorizada'})
	}
})

/* -------------------------------------------------------------------------- */
/*                                   Carrito                                  */
/* -------------------------------------------------------------------------- */
routerCarrito.get("/", (req, res, next) => {
  const producto = new Carrito();
  producto.getAll().then((obj) =>{
    res.send(obj)
	})
});

routerCarrito.get("/:id", (req, res, next) => {
	const {id} = req.params 
  const producto = new Carrito();
  producto.getById(id).then((obj) => {
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
	file.save({
		  timestampCarrito:timestampCarrito,
			producto:{
			timestamp: timestamp,
			nombre: nombre,
			descripcion: descripcion,
			codigo: codigo,
			foto: foto,
			precio: precio,
			stock: stock,
	}}).then(maxId =>{c
		res.send(maxId)})
})

app.get('/', (req, res) => {
	
	res.sendFile(__dirname + '/index.html')
})
routerCarrito.put('/:idCarrito', (req, res) => {

	const { timestampCarrito ,producto} = req.body
	const  {id, timestamp, nombre, descripcion, codigo, foto, precio, stock}  = producto
	const {idCarrito} = req.params 
	const idCarr = parseInt(idCarrito,10)
	const carrito = new Carrito();
	carrito.updateById(idCarr, {
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
	producto.deleteById(id)
	res.json({
		ProductoConIdBorrado:id,
	})
})


// app.options('*', cors());

app.use('/api/productos', routerProducto) 
app.use('/api/carrito', routerCarrito) 

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor express corriendo en port ${PORT}`);
});



server.on("error", (error) => console.log(error));
