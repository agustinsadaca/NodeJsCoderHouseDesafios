import React from 'react';

import axios from 'axios';

import classes from './Cart.module.css';

function CartItems(props) {

  const deleteCartItem = (params) => {
    const storedUserLoggedInInformation = localStorage.getItem('token');
    
    axios.delete(`http://localhost:8080/api/shoppingcartproducts/${props.idProd}`,{
      headers: {
        Authorization: `Bearer ${storedUserLoggedInInformation}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:8080",
      },
      withCredentials: true,
    });
    props.onDelete((cart)=>{
      const cartFiltered = cart.productos.filter(item=>item._id!==props.idProd)
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
