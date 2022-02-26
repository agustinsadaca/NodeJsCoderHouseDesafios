import express from "express";
import cors from 'cors';
import  Router from 'express' 
import  Producto from "./services/producto.js";
import  Carrito from "./services/carrito.js";
import session from 'express-session'
import passport from './utils/passport.util.js'
import UserRouter from './routers/auth.route.js'
import routerProducto from './routers/productos.route.js'
import routerCarrito from './routers/carrito.route.js'

const app = express();
app.use(cors({
  origin: '*'
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge:Number(process.env.EXPIRE)
  },
  rolling: true,
  resave: true,
  saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/',UserRouter)
app.use('/api/productos', routerProducto) 
app.use('/api/carrito', routerCarrito) 

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor express corriendo en port ${PORT}`);
});

server.on("error", (error) => console.log(error));

// {"email":"mail",
// "firstName":"first",
// "lastName":"last"}
