import express from "express";
import cors from 'cors';
import  Router from 'express' 
import  Producto from "./services/producto.js";
import  Carrito from "./services/carrito.js";
import session from 'express-session'
import passport from "passport"
import emoji from 'node-emoji'
import UserRouter from './routers/userRoutes.js'
import MessageRouter from './controllers/message.controller.js'
// import routerProducto from './routers/productos.route.js'
// import routerCarrito from './routers/carrito.route.js'
import cookieParser from 'cookie-parser'
import "./strategies/JwtStrategy.js"
import  "./strategies/LocalStrategy.js"
import  "./middlewares/authenticate.js"
import handlebars from 'express-handlebars'
import path from 'path';
import {fileURLToPath} from 'url';
import { createServer } from "http";
import { Server } from "socket.io";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.COOKIE_SECRET))
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions))

app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge:Number(process.env.EXPIRE)
  },
  rolling: true,
  resave: true,
  saveUninitialized:true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/user', UserRouter)

// app.use('/api/productos', routerProducto) 
// app.use('/api/carrito', routerCarrito) 

app.engine(
	'hbs',
	handlebars({
		extname: '.hbs',
		defaultLayout: 'main.hbs',
		layoutsDir: __dirname + '/views',
	}),
)
app.use(express.static('public'))
app.set('views', './backend/views')
app.set('view engine', 'hbs')
app.get('/', (req, res) => {
  res.render('main', {
    layout: 'main'
  })
})
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors:{
		oring:'http://localhost:3000',
	},
});
const Message = new MessageRouter(io)

const PORT = process.env.PORT;
const server = httpServer.listen(PORT, () => {
  console.log(`Servidor express corriendo en port ${PORT}`);
});


server.on("error", (error) => console.log(error));

