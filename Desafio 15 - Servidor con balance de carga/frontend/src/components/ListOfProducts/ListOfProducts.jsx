import ItemProducto from "./ItemProducto";
import ProductAdd from "./ProductAdd";
import Card from "../UI/Card";
import Modal from "../UI/Modal";
import classes from "./ListOfProducts.module.css";

import { useState, useEffect, Fragment } from "react";
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
      <Card>
        <ItemProducto
          key={prod._id}
          id={prod._id}
          timestamp={prod.timestamp}
          descripcion={prod.descripcion}
          foto={prod.foto}
          precio={prod.precio}
          stock={prod.stock}
          codigo={prod.codigo}
          nombre={prod.nombre}
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
      <button className={classes.boton} onClick={showAddProduct}>Agregar Productos</button>
      {addProductsVisibility ? (
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
