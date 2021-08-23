const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const { Contenedor } = require("./agustinsadaca");



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine(
	'hbs',
	handlebars({
		extname: '.hbs',
		defaultLayout: 'index.hbs',
		layoutsDir: __dirname + '/views/layouts',
		partialsDir: __dirname + '/views/partials',
	}),
	)
	
	app.use(express.static('public'))
	
	app.set('views', './views')
	app.set('view engine', 'hbs')
	
	app.get('/productos',async (req, res) => {
		const contenedor = new Contenedor();
		const productos = await contenedor.getAll()
		const lengthProd = productos.length!=0;
		console.log(lengthProd);
		res.render('productos', {
			productos,
			lengthProd,
			layout: 'index'
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
		res.render('formulario', {
			layout: 'index'
		})
	})

app.listen(8080, () => console.log('Server started on 8080'))



