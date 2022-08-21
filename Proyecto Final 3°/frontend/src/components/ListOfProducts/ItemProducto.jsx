import {
  Fragment,
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

import Modal from '../UI/Modal';
import classes from './ItemProducto.module.css';
import ProductEdit from './ProductEdit';

const ItemProducto = (props) => {
  const [editModalVisivility, seteditModalVisivility] = useState(false);
  const [admingConfig, setAdminConfig] = useState(false);
  // const adminConfig = localStorage.getItem("admin")
  useEffect(() => {
    const isTrueAdmin = localStorage.getItem("admin") === "true";
    setAdminConfig(isTrueAdmin);
  }, [setAdminConfig]);

  const getEditModal = (params) => {
    seteditModalVisivility(true);
  };
  const deleteProduct = (params) => {
    axios.delete(`http://localhost:8080/api/productos/${props.id}`, {
      data: { admin: true },
    });
    window.location.reload();
  };
  const hideEditModal = (params) => {
    seteditModalVisivility(false);
  };
  const addCartItem = async (params) => {
    const storedUserLoggedInInformation = localStorage.getItem("token");

    const saveCartItem = await axios.post(
      `http://localhost:8080/api/shoppingcartproducts`,
      {
        id: props.id,
      },
      {
        headers: {
          Authorization: `Bearer ${storedUserLoggedInInformation}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:8080",
        },
        withCredentials: true,
      }
    );
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
        <button type="button" className={classes.button} onClick={addCartItem}>
          Agregar al Carrito
        </button>
        {admingConfig ? (
          <div>
            <button className={classes.button} onClick={getEditModal}>
              Editar
            </button>
            <button className={classes.button} onClick={deleteProduct}>
              Borrar
            </button>
          </div>
        ) : (
          Fragment
        )}
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
