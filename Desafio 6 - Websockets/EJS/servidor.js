const express = require('express')
const emoji = require('node-emoji')
const { Contenedor } = require("./agustinsadaca");
const { Message } = require("./messages");
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io');
const { Socket } = require('dgram');

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer,{
	cors:{
		oring:'http://localhost:3000',
	},
})
/* -------------------------------------------------------------------------- */
/*                                  Socket.io                                 */
/* -------------------------------------------------------------------------- */
const messages = []

 io.on('connection',async (socket) => {
	console.log(emoji.get('pizza'), 'Usuario conectado')
	socket.emit('connectionMessage', 'Bienvenidos a el socket Coderhouse')
	const mess = new Message()
	const messGetAll = await mess.getAll()
	socket.emit('messageBackend', messGetAll)
	socket.emit('prodChangeBack',true)
	socket.on('disconnect', (data) => {
		console.log(emoji.get('fire'), 'Usuario desconectado')
	})
	socket.on('messageFront',async (data) => {
		const mess = new Message()
		const date = new Date().toLocaleString(); 
		
		const messSave = await mess.save({email:data.user,message:data.message,date:date})
		
		io.sockets.emit('messageBackend', messGetAll)
	})
	
	socket.on('prodChange',(data) => {	
		io.sockets.emit('prodChangeBack', true)
	})

})


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
	
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/productos',async (req, res) => {
	const contenedor = new Contenedor();
	const productos = await contenedor.getAll()
	res.render('pages/productos', {
		productos
		
	})
	
})
app.get('/producto',async (req, res) => {
	const contenedor = new Contenedor();
	const productos = await contenedor.getAll()
	
	res.send(productos)
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
	res.render('pages/formulario')
})


httpServer.listen(8080, () => console.log('Server started on 8080'))



