const createTable = require("./Knex/createTable");
const createTableSqlite = require("./sqlite3/createTable");
const express = require("express");
const emoji = require("node-emoji");
const { Contenedor } = require("./productos");
const { Message } = require("./messages");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { Socket } = require("dgram");
const fakerUtil = require("./utils/producto.utils");
const { normalize, denormalize, schema } = require("normalizr");
const util = require("util");

// const { normalize } = require("path");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer, {
  cors: {
    oring: "http://localhost:3000",
  },
});
const config = {
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "coderhouse",
  },
};
createTable.createTable();
// createTableSqlite.createTable()
/* -------------------------------------------------------------------------- */
/*                                  Socket.io                                 */
/* -------------------------------------------------------------------------- */
const messages = [];

io.on("connection", async (socket) => {
  console.log(emoji.get("pizza"), "Usuario conectado");
  socket.emit("connectionMessage", "Bienvenidos a el socket Coderhouse");
  const mess = new Message();
  /* -------------------------------------------------------------------------- */
  /*                                  Normalize                                 */
  /* -------------------------------------------------------------------------- */
  
  const messGetAll = await mess.getAll().then(data=>{

  const user = new schema.Entity("user");
  
  const comment = new schema.Entity("comment", {
    author: user,
  });
  const chat = new schema.Entity("chat", {
    comments: [comment],
  });
  const normData = normalize(JSON.parse(data), chat);

  function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true));
  }
  print(normData);

  socket.emit("messageBackend", normData);
  })
  socket.emit("prodChangeBack", false);
  socket.on("disconnect", (data) => {
    console.log(emoji.get("fire"), "Usuario desconectado");
  });
  socket.on("messageFront", async (data) => {
    const mess = new Message();
    const date = new Date().toLocaleString();

    const messSave = await mess.save({
      email: data.user,
      message: data.message,
      date: date,
    });

    io.sockets.emit("messageBackend", messGetAll);
  });

  socket.on("prodChange", async (data) => {
    const file = new Contenedor(config);
    const guardar = await file.save({
      title: data.title,
      price: data.price,
      thumbnail: data.thumbnail,
    });
    io.sockets.emit("prodChangeBack", false);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/productos", async (req, res) => {
  const contenedor = new Contenedor(config);
  const productos = await contenedor.getAll();
  // console.log(productos[0]);
  res.render("pages/productos", {
    productos,
  });
});
app.get("/producto", async (req, res) => {
  const contenedor = new Contenedor(config);
  const productos = await contenedor.getAll();
  // console.log(productos[0]);

  res.send(productos);
});

app.post("/productos", async (req, res) => {
  // url http://localhost:8080/
  const { title, thumbnail, price } = req.body;

  const file = new Contenedor();

  const guardar = await file.save({
    title: title,
    price: price,
    thumbnail: thumbnail,
  });
  const mensaje = "correcto";
  res.redirect("/");
});

/* -------------------------------------------------------------------------- */
/*                                    Mock                                    */
/* -------------------------------------------------------------------------- */
app.get("/producto/test", async (req, res) => {
  let productos = [];
  for (let i = 0; i < 5; i++) {
    const producto = { ...fakerUtil() };
    productos.push(producto);
  }
  res.render("pages/productosFaker", {
    productos,
  });
});

app.get("/", (req, res) => {
  res.render("pages/formulario");
});

httpServer.listen(8080, () => console.log("Server started on 8080"));
