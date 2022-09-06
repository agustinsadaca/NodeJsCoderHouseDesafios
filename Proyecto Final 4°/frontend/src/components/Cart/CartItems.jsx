import React from 'react';

import axios from 'axios';

import classes from './CartItems.module.css';

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
        <p>{props.name}</p>
      </td>
      <td>
        <p>{props.description}</p>
      </td>
      <td>
        <p>{new Date(props.timestamp).toLocaleDateString("es-AR")}</p>
      </td>
      <td >
        <img className={classes.tdImg} src={props.image} />
      </td>
      <td>
        <p>{props.price}</p>
      </td>
      <td>
        <p>{props.code}</p>
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
