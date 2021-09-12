import classes from './ItemProducto.module.css';

const ItemProducto = props => {
    
        return (
        <div className={classes.producto} >
            {/* <p>{new Date(props.timestamp).toLocaleDateString("es-AR")}</p> */}
            <p>{props.descripcion}</p>
            <p>{props.foto}</p>
            <p>{props.precio}</p>
            <p>{props.stock}</p>
            <p>{props.nombre}</p>
        </div>);
}
export default ItemProducto;