import classes from "./ItemProducto.module.css";
import Modal from "../UI/Modal";
import { Fragment, useState } from "react";
import ProductEdit from "./ProductEdit";
import axios from 'axios'

const ItemProducto = (props) => {
  const [editModalVisivility, seteditModalVisivility] = useState(false);
  const getEditModal = (params) => {
    seteditModalVisivility(true);
  };
  const deleteProduct = (params) => {
    axios.delete(`http://localhost:8080/api/productos/${props.id}`,{data:{admin:true}})
    window.location.reload()
  };
  const hideEditModal = (params) => {
    seteditModalVisivility(false);
  };
  const addCartItem =async (params) => {
    const saveCartItem = await axios.post(`http://localhost:8080/api/carrito`,{
      timestampCarrito:Date.now(),
      producto:{
      "id": props.id,
      "timestamp": props.timestamp,
      "nombre": props.nombre,
      "descripcion": props.descripcion,
      "codigo": props.codigo,
      "foto": props.foto,
      "precio": props.precio,
      "stock": props.stock,
      }
    })

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
        <button className={classes.button} onClick={getEditModal}>
          Editar
        </button>
        <button className={classes.button} onClick={deleteProduct}>
          Borrar
        </button>
        <button type="button" className={classes.button} onClick={addCartItem}>
          Agregar al Carrito
        </button>
        {editModalVisivility ? (
          <Modal onClose={hideEditModal}>
            <ProductEdit
              onClose={hideEditModal}
              key={props.key}
              id={props.id}
              nombre={props.nombre}
              descripcion={props.descripcion}
              timestamp={props.timestamp}
              foto={props.foto}
              precio={props.precio}
              codigo={props.codigo}
              stock={props.stock}
            ></ProductEdit>
          </Modal>
        ) : (
          Fragment
        )}
      </td>
      <td>
        <p></p>
      </td>
    </tr>
  );
};
export default ItemProducto;
