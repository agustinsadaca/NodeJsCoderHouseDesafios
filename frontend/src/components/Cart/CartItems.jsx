import axios from "axios";
import React from "react";
import classes from "./Cart.module.css";

function CartItems(props) {
  const deleteCartItem = (params) => {
    axios.delete(`http://localhost:8080/api/carrito/${props.idCarrito}`);
    props.onDelete((cart)=>{
      const cartFiltered = cart.filter(item=>item.idCarrito!==props.idCarrito)
      return [...cartFiltered]
    });
  };

  return (
    <tr>
      <td>
        <p>{props.nombre}</p>
      </td>
      <td>
        <p>{props.descripcion}</p>
      </td>
      <td>
        <p>{new Date(props.timestamp).toLocaleDateString("es-AR")}</p>
      </td>
      <td className={classes.tdImg}>
        <img src={props.foto} />
      </td>
      <td>
        <p>{props.precio}</p>
      </td>
      <td>
        <p>{props.codigo}</p>
      </td>
      <td>
        <p>{props.stock}</p>
      </td>
      <td>
        <button className={classes.borrar} onClick={deleteCartItem}>
          Borrar
        </button>
      </td>
      <td>
        <p></p>
      </td>
    </tr>
  );
}

export default CartItems;
