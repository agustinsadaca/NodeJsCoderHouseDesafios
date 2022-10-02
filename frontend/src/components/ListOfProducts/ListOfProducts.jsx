import {
  Fragment,
  useEffect,
  useState,
} from 'react';

import Card from '../UI/Card';
import Modal from '../UI/Modal';
import ItemProducto from './ItemProducto';
import classes from './ListOfProducts.module.css';
import ProductAdd from './ProductAdd';

const axios = require("axios");

const ListOfProducts = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addProductsVisibility, setaddProductsVisibility] = useState(false);
  
  useEffect(() => {
    
    setLoading(true);
    axios
      .get("http://localhost:8080/api/productos", {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Credentials": true,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      });
  }, [setProducts]);
  let listP;
  if (products.length !== 0) {
    listP = products.map((prod) => (
      <Card key={Math.random()}>
        <ItemProducto
          key={prod._id}
          id={prod._id}
          timestamp={prod.timestamp}
          description={prod.description}
          image={prod.image}
          price={prod.price}
          stock={prod.stock}
          code={prod.code}
          name={prod.name}
        ></ItemProducto>
      </Card>
    ));
  }
  const showAddProduct = (params) => {
    setaddProductsVisibility(true);
  };
  const hideAddModal = (params) => {
    setaddProductsVisibility(false);
  };

  return (
    <div>
      <h1>Productos</h1>
{   localStorage.getItem("admin") === "true" ? ( <button className={classes.boton} onClick={showAddProduct}>Agregar Productos</button>): (Fragment)
}      {addProductsVisibility ? (
        <Modal onClose={hideAddModal}>
            <ProductAdd
              onClose={hideAddModal}
            
            ></ProductAdd>
          </Modal>):Fragment
        }
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
};

export default ListOfProducts;
