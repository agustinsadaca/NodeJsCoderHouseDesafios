import axios from "axios";
import React, { Fragment,useState,useEffect} from "react";
import Card from "../UI/Card";
import CartItems from "./CartItems";

function Cart(props) {
  const [cartItems, setcartItems] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    axios.get("http://localhost:8080/api/carrito").then((response) => {
      setcartItems(response.data);
      setloading(false);
    });
  }, [setcartItems]);

  let listP;
  if (cartItems.length !== 0) {
    listP = cartItems.map((cartItem) => (
      <Card>
        <CartItems
          onDelete={setcartItems}
          key={cartItem.idCarrito}
          idCarrito={cartItem.idCarrito}
          timestampCarrito={cartItem.timestampCarrito}
          descripcion={cartItem.producto.descripcion}
          foto={cartItem.producto.foto}
          precio={cartItem.producto.precio}
          stock={cartItem.producto.stock}
          codigo={cartItem.producto.codigo}
          nombre={cartItem.producto.nombre}
        ></CartItems>
      </Card>
    ));
  }
  return (
    <div>
      <table className="u-full-width">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Fecha Creacion</th>
            <th>Foto</th>
            <th>Precio</th>
            <th>Codigo</th>
            <th>Stock</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading && <p>Loading</p>}
          {!loading && listP}
        </tbody>
      </table>
    </div>
  );
}

export default Cart;
