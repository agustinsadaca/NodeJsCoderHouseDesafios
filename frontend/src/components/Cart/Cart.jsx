import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

import Card from '../UI/Card';
import CartItems from './CartItems';

function Cart(props) {
  const [cartItems, setcartItems] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    const storedUserLoggedInInformation = localStorage.getItem("token");

    axios
      .get("http://localhost:8080/api/shoppingcartproducts", {
        headers: {
          Authorization: `Bearer ${storedUserLoggedInInformation}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:8080",
        },
        withCredentials: true,
      })
      .then((response) => {
        setcartItems(response.data);
        console.log(response.data);
        if (typeof response.data === "string") {
          setloading(true);
        } else {
          setloading(false);
        }
      });
  }, [setcartItems]);

  let listP;
  if (cartItems.length !== 0 && typeof cartItems !== "string") {
    listP = cartItems.productos.map((cartItem) => (
      <Card>
        <CartItems
          onDelete={setcartItems}
          key={cartItem._id}
          idProd={cartItem._id}
          description={cartItem.description}
          image={cartItem.image}
          price={cartItem.price}
          stock={cartItem.stock}
          code={cartItem.code}
          name={cartItem.name}
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
