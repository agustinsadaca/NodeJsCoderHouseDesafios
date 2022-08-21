import './strategies/JwtStrategy.js';
import './strategies/LocalStrategy.js';
import './middlewares/authenticate.js';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import handlebars from 'express-handlebars';
import session from 'express-session';
import { createServer } from 'http';
import os from 'os';
import passport from 'passport';
import path from 'path';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';

import MessageRouter from './controllers/message.controller.js';
import routerCarrito from './routers/carrito.route.js';
import routerInfo from './routers/info.router.js';
import routerProducto from './routers/productos.route.js';
import random from './routers/random.route.js';
import UserRouter from './routers/userRoutes.js';
import logger from './utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nCpus = os.cpus().length;


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: Number(process.env.EXPIRE),
    },
    rolling: true,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.use("/user", UserRouter);
app.use("/api/productos", routerProducto);
app.use("/api/shoppingcartproducts", routerCarrito);
app.use("/api/info", routerInfo);
app.use("/api/random", random);

app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    layoutsDir: __dirname + "/views",
  })
);
app.use(express.static("public"));
app.set("views", "./backend/views");
app.set("view engine", "hbs");
app.get("/", (req, res) => {
  res.render("main", {
    layout: "main",
  });
});

app.get("/info", (req, res) => {
  res.render("config", {
    layout: "config",
  });
});
app.all('*', (req, res) => {
  const { url, method } = req
  logger.warn(`Ruta ${method} ${url} no implementada`)
  res.send(`Ruta ${method} ${url} no está implementada`)
})
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    oring: "http://localhost:3000",
  },
});
const Message = new MessageRouter(io);
const PORT = process.env.PORT;


const server = httpServer.listen(PORT, () => {
  console.log(`Servidor express corriendo en port ${PORT}`);
});
server.on('error', error => logger.error(`Error en servidor: ${error}`))


