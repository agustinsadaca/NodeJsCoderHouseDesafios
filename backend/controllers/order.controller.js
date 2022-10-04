import Carrito from "../services/carrito.js";
import Orden from "../services/orden.js";
import Producto from "../services/producto.js";

export async function getCart(req, res) {
  const orden = new Orden();
  const ordenes= await orden.readOrdersUser(req.user._id);
  if (!ordenes) {
    return res.status(200).send("No se encontraron ordenes");
  } else {
    return res.status(200).send(ordenes);
  }
}
export async function createOrder(req, res) {

  const cart = new Carrito();
  const carrito = await cart.readOneUser(req.user._id);
  if(carrito && carrito.prods.length > 0){
    const orden = new Orden();
    console.log("aqui", carrito);
    const createOrder = await orden.createOrden(carrito)
    cart.emptyCart(req.user._id)
    return res.status(200).send(createOrder);
  }else{
    return res.status(200).send({message:"El carrito se encuentra vacío"});

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
    return res.status(400).json({ message: "Product not found in cart." });
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
