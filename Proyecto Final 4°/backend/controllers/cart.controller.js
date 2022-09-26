import Carrito from "../services/carrito.js";
import Producto from "../services/producto.js";
import mongoose from "mongoose";
export async function getCart(req, res) {
  const carrito = new Carrito();
  const carritoUser = await carrito.readOneUser(req.user.id);
  if (!carritoUser) {
    res.send("Su carrito no posee productos");
  } else {
    carrito.readAll(carritoUser._id).then((obj) => {
      res.send(obj);
    });
  }
}
export async function addProductToCart(req, res) {
  const { productId } = req.body;
  const product = new Producto();
  const prod = await product.readOne(id);
  if (!prod) {
    res.status(400).json({message: "Product not found."});
  }
  const cart = new Carrito();
  const carrito = await cart.readOneUser(req.user.id);
  console.log(carrito);
  if (carrito) {
    cart
      .addProductToCart({
        _id: carrito._id,
        product: prod,
      })
      .then((maxId) => {
        res.send(maxId);
      });
  } else {
    cart
      .createCarrito({
        user: req.user.id,
        timestampCarrito: Date.now(),
        productos: [prod],
      })
      .then((maxId) => {
        res.send(maxId);
      });
  }
}
export async function deleteProductFromCart(req, res) {
    const { id } = req.params;

    const producto = new Carrito();
    const carrito = await producto.readOneUser(req.user.id);
    let myObjectIdString =  mongoose.Types.ObjectId(id);
    console.log(myObjectIdString);
  
    producto.deleteCarrito(carrito._id.toString(), id);
    res.json({
      ProductoConIdBorrado: id,
    });
}
