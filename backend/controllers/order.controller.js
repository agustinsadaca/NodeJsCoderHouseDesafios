import Carrito from "../services/carrito.js";
import Orden from "../services/orden.js";
import enviarMail from "../utils/nodemailer.js";
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

    let html = `<table class="u-full-width">
    <thead>
      <tr>
        <th>Nombre Cliente ${req.user.name}</th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>Nombre Producto</th>
        <th>Descripcion</th>
        <th>Precio</th>
        <th>Cantidad</th>
      </tr>
    </thead>
    <tbody>
      ${carrito.prods.map(producto=>{
        return `<tr>
        <td>${producto.name}</td>
        <td>${producto.description}</td>
        <td>${producto.price}</td>
        <td>${producto.amount}</td>
      </tr>`

      })}
      
    </tbody>
  </table>`
    carrito
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: [process.env.GMAIL_USER,req.user.email],
      subject: "Orden Creada",
      html: html,
      
    };
    
    enviarMail(mailOptions)

    cart.emptyCart(req.user._id)

    return res.status(200).send(createOrder);
  }else{
    return res.status(200).send({message:"The cart is empty"});
  }
}

