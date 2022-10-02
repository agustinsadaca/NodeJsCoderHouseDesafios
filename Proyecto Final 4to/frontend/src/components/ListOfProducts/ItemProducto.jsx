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
        <p>{props.name}</p>
      </td>
      <td>
        <p>{props.description}</p>
      </td>
      <td>
        <p>{new Date(props.timestamp).toLocaleDateString("es-AR")}</p>
      </td>
      <td className={classes.tdImg}>
        <img src={props.image} />
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
              name={props.name}
              description={props.description}
              timestamp={props.timestamp}
              image={props.image}
              price={props.price}
              code={props.code}
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
