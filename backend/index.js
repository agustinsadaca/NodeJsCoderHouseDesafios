import express from "express";
import cors from 'cors';
import  Router from 'express' 
import  Producto from "./services/producto.js";
import  Carrito from "./services/carrito.js";
import session from 'express-session'
import passport from "passport"
import UserRouter from './routers/userRoutes.js'
// import routerProducto from './routers/productos.route.js'
// import routerCarrito from './routers/carrito.route.js'
import cookieParser from 'cookie-parser'
import "./strategies/JwtStrategy.js"
import  "./strategies/LocalStrategy.js"
import  "./middlewares/authenticate.js"
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.COOKIE_SECRET))
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
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

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Servidor express corriendo en port ${PORT}`);
});

server.on("error", (error) => console.log(error));

// {"email":"mail",
// "firstName":"first",
// "lastName":"last"}
