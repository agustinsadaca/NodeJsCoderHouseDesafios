import axios from "axios";
import React, { Fragment,useState,useEffect} from "react";
import Card from "../UI/Card";
import CartItems from "./CartItems";

function Cart(props) {
  const [cartItems, setcartItems] = useState([]);
  const [cartProperties, setCartProperties] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    axios.get("http://localhost:8080/api/carritos").then((response) => {
      setCartProperties(response.data);
      setcartItems(response.data[0].productos);
      setloading(false);
    });
  }, [setcartItems]);
  let listP;
  if (cartItems.length !== 0) {
    listP = cartItems.map((cartItem,index) => (
      <Card>
        <CartItems
          onDelete={setcartItems}
          idCarrito={cartProperties[0]}
          idProducto={cartItem.id}
          itemId={index}
          foto={cartItem.foto}
          precio={cartItem.precio}
          stock={cartItem.stock}
          codigo={cartItem.codigo}
          nombre={cartItem.nombre}
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
