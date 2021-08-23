const express = require('express')
const app = express()
const { Contenedor } = require("./agustinsadaca");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
	
	app.set('views', './views')
	app.set('view engine', 'pug')
	
	app.get('/productos',async (req, res) => {
		const contenedor = new Contenedor();
		const productos = await contenedor.getAll()
		// res.send(productos)
		res.render('producto', {
			productos
			
		})
	})
	
	app.post('/productos',async (req, res) => {
		// url http://localhost:8080/
		const  {title,thumbnail,price}  = req.body
		
		const file = new Contenedor()
		
		const guardar = await file.save({
			title: title ,
			price: price,
			thumbnail: thumbnail,
		})
		const mensaje = 'correcto'
		res.redirect('/')

	})

	
	app.get('/', (req, res) => {
		res.render('formulario')
	})


app.listen(8080, () => console.log('Server started on 8080'))



