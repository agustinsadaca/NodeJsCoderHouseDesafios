import Carrito from "../services/carrito.js";
import Orden from "../services/orden.js";
import Producto from "../services/producto.js";

export async function getOrders(req, res) {
  const orden = new Orden();
  const ordenes= await orden.readOrdersUser(req.user._id);
  if (!ordenes) {
    return res.status(200).send("Orders not found");
  } else {
    return res.status(200).send(ordenes);
  }
}
export async function createOrder(req, res) {

  const cart = new Carrito();
  const carrito = await cart.readOneUser(req.user._id);
  if(carrito && carrito.prods.length > 0){
    const orden = new Orden();
    const createOrder = await orden.createOrden(carrito)
    cart.emptyCart(req.user._id)
    return res.status(200).send(createOrder);
  }else{
    return res.status(200).send({message:"The cart is empty"});
  }
}

