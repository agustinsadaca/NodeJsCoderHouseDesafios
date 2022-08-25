import express from 'express';

import { verifyUser } from '../middlewares/authenticate.js';
import Carrito from '../services/carrito.js';
import Producto from '../services/producto.js';

const routerCarrito = express.Router();

routerCarrito.get("/", verifyUser, async (req, res, next) => {
  const carrito = new Carrito();
  const carritoUser = await carrito.readOneUser(req.user.id);
  console.log(!carritoUser);
  if (!carritoUser) {
    res.send("Su carrito no posee productos");
  } else {
    carrito.readAll(carritoUser._id).then((obj) => {
      res.send(obj);
    });
  }
});

routerCarrito.get("/:id", (req, res, next) => {
  const { id } = req.params;
  const producto = new Carrito();
  producto.readOne(id).then((obj) => {
    res.send(obj);
  });
});

routerCarrito.post("/", verifyUser, async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400);
  }
  const product = new Producto();
  const prod = await product.readOne(id);

  const file = new Carrito();
  const carrito = await file.readOneUser(req.user.id);
  console.log(carrito);
  if (carrito) {
    file
      .addProductToCart({
        _id: carrito._id,
        product: prod,
      })
      .then((maxId) => {
        res.send(maxId);
      });
  } else {
    file
      .createCarrito({
        user: req.user.id,
        timestampCarrito: Date.now(),
        productos: [prod],
      })
      .then((maxId) => {
        res.send(maxId);
      });
  }
});

routerCarrito.put("/:idCarrito", (req, res) => {
  const { timestampCarrito, producto } = req.body;
  const { id, timestamp, nombre, descripcion, codigo, foto, precio, stock } =
    producto;
  const { idCarrito } = req.params;
  const idCarr = idCarrito;
  const carrito = new Carrito();
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

routerCarrito.delete("/:id", verifyUser, async (req, res) => {
  const { id } = req.params;
  const producto = new Carrito();
  const carrito = await producto.readOneUser(req.user.id);

  producto.deleteCarrito(carrito._id, id)
  res.json({
    ProductoConIdBorrado: id,
  });
});

export default routerCarrito;
