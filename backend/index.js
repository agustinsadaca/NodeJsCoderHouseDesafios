import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import { createServer } from "http";
import os from "os";
import path from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import {
  UserRoutes,
  UserLoginRoutes,
  ProductosRoute,
  CarritoRoute,
  InfoRouter,
  OrdenesRoute,
  ImagesRoutes
} from "./routers/index.js"; 
import MessageRouter from "./controllers/message.controller.js";
import logger from "./utils/logger.js";
import bodyParser from "body-parser"
// import "./routers/imagenes.route.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static("public"));

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

app.use("/api/users", UserRoutes);
app.use("/login", UserLoginRoutes);
app.use("/api/products", ProductosRoute);
app.use("/api/shoppingcartproducts", CarritoRoute);
app.use("/api/info", InfoRouter);
app.use("/api/orders", OrdenesRoute);
app.use("/api/images", ImagesRoutes);

app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    layoutsDir: __dirname + "/views",
  })
);
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
app.all("*", (req, res) => {
  const { url, method } = req;
  logger.warn(`Ruta ${method} ${url} no implementada`);
  res.send(`Ruta ${method} ${url} no está implementada`);
});
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    oring: "http://localhost:3000",
  },
});
const Message = new MessageRouter(io);
const PORT = process.env.PORT || 8080;

const server = httpServer.listen(PORT, () => {
  console.log(`Servidor express corriendo en port ${PORT}`);
});
server.on("error", (error) => logger.error(`Error en servidor: ${error}`));
