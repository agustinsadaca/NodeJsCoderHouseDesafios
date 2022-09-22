import express from "express";
import cors from "cors";
import Router from "express";
// import  ProductoDaoArchivo from "./daos/daosMongodb/productoDaoMongoDb.js";
import { producto, carrito } from "./daos/index.js";
import dotenv from "dotenv";
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import { graphqlMiddleware } from './middlewares/graphqlMiddleware'


app.use('/graphql', graphqlMiddleware)

dotenv.config();

const app = express();
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routerProducto = new Router();
const routerCarrito = new Router();
/* -------------------------------------------------------------------------- */
/*                                  Productos                                 */
/* -------------------------------------------------------------------------- */

routerProducto.get("/", async (req, res, next) => {
  const listaDeProductos = producto.readAll().then((obj) => {
    res.send(obj);
  });
});

routerProducto.get("/:id", (req, res, next) => {
  const { id } = req.params;
  producto.readOne(id).then((obj) => {
    res.send(obj);
  });
});

routerProducto.post("/", (req, res) => {
  const { timestamp, nombre, descripcion, codigo, foto, precio, stock, admin } =
    req.body;
  // {
  //   "timestamp": 1631072864163,
  //   "nombre": "regla",
  //   "descripcion": "elemento de medicion",
  //   "codigo": 1515,
  //   "foto": "https://cdn1.iconfinder.com/data/icons/education-filled-outline-8/64/Education-Filled_2-512.png",
  //   "precio": 14,
  //   "stock": 14
  // }
  if (admin) {
    producto
      .createProducto({
        timestamp: timestamp,
        nombre: nombre,
        descripcion: descripcion,
        codigo: codigo,
        foto: foto,
        precio: precio,
        stock: stock,
      })
      .then((maxId) => res.redirect("/api/productos/" + maxId));
  } else {
    res.send({
      error: -1,
      descripcion: "ruta api/productos método post/save no autorizada",
    });
  }
});

routerProducto.put("/:id", (req, res) => {
  const { timestamp, nombre, descripcion, codigo, foto, precio, stock, admin } = req.body;
  const { id } = req.params;
  if (admin) {
    producto
      .update(id, {
        timestamp,
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock,
      })
      .catch((data) =>
        res.json({
          idProductoEditado: id,
        })
      );
  } else {
    res.send({
      error: -2,
      descripcion: "ruta api/productos método put/update no autorizada",
    });
  }
});

routerProducto.delete("/:id", (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;
  if (admin) {
    producto.deleteProducto(id);
    res.json({
      ProductoConIdBorrado: id,
    });
  } else {
    res.send({
      error: -3,
      descripcion: "ruta api/productos método delete no autorizada",
    });
  }
});

/* -------------------------------------------------------------------------- */
/*                                   Carrito                                  */
/* -------------------------------------------------------------------------- */
routerCarrito.get("/", (req, res, next) => {
  carrito.readAll().then((obj) => {
    res.send(obj);
  });
});

routerCarrito.get("/:id", (req, res, next) => {
  const { id } = req.params;
  carrito.readOne(id).then((obj) => {
    res.send(obj);
  });
});

routerCarrito.post("/", (req, res) => {
  const { timestampCarrito, producto } = req.body;
  const { id, timestamp, nombre, descripcion, codigo, foto, precio, stock } =
    producto;
  // {
  // 	"timestampCarrito":1631072864163,
  // 	"producto":{
  // 		"timestamp": 1631072864163,
  // 		"nombre": "reg",
  // 		"descripcion": "descripcion",
  // 		"codigo": "codigo",
  // 		"foto": "foto",
  // 		"precio": 20,
  // 		"stock": 30
  // }}
  
  carrito
    .createCarrito({
      timestampCarrito: timestampCarrito,
      producto: {
        timestamp: timestamp,
        nombre: nombre,
        descripcion: descripcion,
        codigo: codigo,
        foto: foto,
        precio: precio,
        stock: stock,
      },
    })
    .then((maxId) => {
      res.send(maxId);
    });
});


routerCarrito.put("/:idCarrito", (req, res) => {
  const { timestampCarrito, producto } = req.body;
  const { id, timestamp, nombre, descripcion, codigo, foto, precio, stock } =
    producto;
  const { idCarrito } = req.params;
  const idCarr = idCarrito;
  carrito
    .update(idCarr, {
      timestampCarrito: timestampCarrito,
      producto: {
        timestamp: timestamp,
        nombre: nombre,
        descripcion: descripcion,
        codigo: codigo,
        foto: foto,
        precio: precio,
        stock: stock,
      },
    })
    .catch((data) =>
      res.json({
        idProductoEditado: id,
      })
    );
});

routerCarrito.delete("/:id/:idProd", (req, res) => {
  const { id, idProd } = req.params;
  carrito.deleteCarrito(id,idProd);
  res.json({
    ProductoConIdBorrado: id,
  });
});
/* -------------------------------------------------------------------------- */
/*                                    LOGIN                                   */
/* -------------------------------------------------------------------------- */
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

app.use(session({
  store: MongoStore.create({
      mongoUrl: process.env.MONGOURI,
      mongoOptions: advancedOptions
  }),
  /* ----------------------------------------------------- */

  secret: 'ClaveSecreta',
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 600000
  }
}))
app.get("/login",(req,res)=>{
  res.send(JSON.stringify(req.session))
  // res.cookie('firmada','Data',{signed:true,maxAge:60000}).send('Cookie firmada')
})
// app.options('*', cors());

app.get('/', (req, res) => {

    res.send(`${req.session}`)

})
app.use("/api/productos", routerProducto);
app.use("/api/carritos", routerCarrito);

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor express corriendo en port ${PORT}`);
});

server.on("error", (error) => console.log(error));
