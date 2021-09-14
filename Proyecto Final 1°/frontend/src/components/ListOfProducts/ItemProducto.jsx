import classes from "./ItemProducto.module.css";
import Modal from "../UI/Modal";

const ItemProducto = (props) => {
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
        
        <Modal onClose={props.onClose}>
          <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onClose}>
              Close
            </button>
          </div>
        </Modal>
      </td>
      <td>
        <p></p>
      </td>
    </tr>
  );
};
export default ItemProducto;
