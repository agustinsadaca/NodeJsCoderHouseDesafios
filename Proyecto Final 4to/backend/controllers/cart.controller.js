import Carrito from "../services/carrito.js";
import Producto from "../services/producto.js";

export async function getCart(req, res) {
  const carrito = new Carrito();
  const carritoUser = await carrito.readOne(req.user._id);
  if (!carritoUser) {
    return res.send("Su carrito no posee productos");
  } else {
    carrito.readAll(carritoUser._id).then((obj) => {
      res.send(obj);
    });
  }
}
export async function addProductToCart(req, res) {
  const { productId } = req.body;
  const product = new Producto();
  const prod = await product.readOne(productId);
  if (!prod) {
    return res.status(400).json({ message: "Product not found." });
  }
  const productJSON = prod.toJSON();
  productJSON.amount = 1;
  const cart = new Carrito();
  const carrito = await cart.readOne(req.user._id);
  if (carrito) {
    const indexProduct = carrito.prods.findIndex(
      (element) => element._id === prod._id
    );
    if (indexProduct != -1) {
      carrito.prods[indexProduct].amount += 1;
    } else {
      carrito.prods.push(productJSON);
    }
    cart
      .addProductToCart({
        _id: carrito._id,
        cart: carrito,
      })
      .then((response) => {
        res.send(response);
      });
  } else {
    cart
      .createCarrito({
        _id: req.user._id,
        timestampCarrito: Date.now(),
        prods: [productJSON],
      })
      .then((response) => {
        res.send(response);
      });
  }
}
export async function deleteProductFromCart(req, res) {
  const { id } = req.params;
  const product = new Producto();
  const prod = await product.readOne(id);
  if (!prod) {
    return res.status(400).json({ message: "Product not found." });
  }
  const cart = new Carrito();
  const carrito = await cart.readOne(req.user._id);
  if (!carrito) {
    return res.status(400).json({ message: "Cart not found." });
  }
  const indexProduct = carrito.prods.findIndex(
    (element) => element._id === prod._id
  );
  if (indexProduct === -1){
    return res.status(400).json({ message: "Product not found in cart." });
  }
  if ( carrito.prods[indexProduct].amount > 1) {
    carrito.prods[indexProduct].amount -= 1;
  } else {
    carrito.prods.splice(indexProduct, 1);
  }
  const responseDelete = await cart.deleteCarrito(carrito._id, carrito);
  res.status(200).json(responseDelete);
}
