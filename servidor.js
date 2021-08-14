const express = require("express");
const { Router } = express //Nueva linea
const { Contenedor } = require("./agustinsadaca");

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const routerProducto= new Router() 

routerProducto.get("/", (req, res, next) => {
  const contenedor = new Contenedor();
  contenedor.getAll().then((obj) =>{
    res.send(obj)
	})
});

routerProducto.get("/:id", (req, res, next) => {
	const {id} = req.params 
  const contenedor = new Contenedor();
  contenedor.getById(id).then((obj) => {
    res.send(obj);
  });
});

routerProducto.post('/', (req, res) => {
	// url http://localhost:8080/
	const  {title,thumbnail,price}  = req.body

	const file = new Contenedor()
	file.save({
			title: title ,
			price: price,
			thumbnail: thumbnail,
	}).then(maxId => res.redirect("/api/productos/" + maxId))
})

app.get('/', (req, res) => {
	
	res.sendFile(__dirname + '/index.html')
})
routerProducto.put('/:id', (req, res) => {
	// ej body:
	// {
  //   "title":"regla",
  //   "price":40,
  //   "thumbnail":"http://1.bp.blogspot.com/-oliQTb5vfmM/Tg6A4u0AWNI/AAAAAAAAAAQ/E31V1mM7GR8/s1600/regla.png"
	// }
	const {title,price,thumbnail} = req.body
	const {id} = req.params 
	const contenedor = new Contenedor();
  contenedor.updateById(id,{title,price,thumbnail}).catch(data => res.json({
		idProductoEditado:id
	
	}))		
})

routerProducto.delete('/:id', (req, res) => {
	const {id} = req.params 
	const contenedor = new Contenedor();
	contenedor.deleteById(id)
	res.json({
		ProductoConIdBorrado:id,
	})
})
app.use('/api/productos', routerProducto) //Nueva linea
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor express corriendo en port ${PORT}`);
});

server.on("error", (error) => console.log(error));
