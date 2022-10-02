import Carrito from "../services/carrito.js";
import Producto from "../services/producto.js";

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
  const prod = await product.readOne(productId);
  if (!prod) {
    res.status(400).json({ message: "Product not found." });
  }
  const productJSON = prod.toJSON();
  productJSON.amount = 1;
  const cart = new Carrito();
  const carrito = await cart.readOneUser(req.user._id);
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
      .then((maxId) => {
        res.send(maxId);
      });
  } else {
    cart
      .createCarrito({
        _id: req.user._id,
        timestampCarrito: Date.now(),
        prods: [productJSON],
      })
      .then((maxId) => {
        res.send(maxId);
      });
  }
}
export async function deleteProductFromCart(req, res) {
  const { id } = req.params;
  const product = new Producto();
  const prod = await product.readOne(id);

  const cart = new Carrito();
  const carrito = await cart.readOneUser(req.user._id);

  const indexProduct = carrito.prods.findIndex(
    (element) => element._id === prod._id
  );
  if (indexProduct === -1){
    res.status(400).json({ message: "Product not found in cart." });
  }
  if ( carrito.prods[indexProduct].amount > 1) {
    carrito.prods[indexProduct].amount -= 1;
  } else {
    carrito.prods.splice(indexProduct, 1);
  }
  console.log("carrito", carrito, "proddd", prod);
  cart.deleteCarrito(carrito._id, carrito);
  res.status(200).json({
    ProductoConIdBorrado: id,
  });
}
