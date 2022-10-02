import React, { Component, useState } from "react";
import Input from "../UI/Input";
import classes from "./ProductEdit.module.css";
import axios from "axios";
import dateFormat from '../Util/dateFormat.js'

const ProductEdit = (props) => {
  const [productData, setproductData] = useState({
    timestamp: props.timestamp,
    name: props.name,
    fecha: props.fecha,
    description: props.description,
    code: props.code,
    foto: props.foto,
    price: props.price,
    stock: props.stock,
  });
  const handleDataChange = (event) => {
    let valueInput = 0;
    if (event.target.name === "timestamp") {
      valueInput = event.target.value.toString();
      const newDate = new dateFormat
      valueInput = newDate.YYYYMMDDxDDMMYYYY(valueInput).getTime();
      console.log(typeof(valueInput));
     
    } else {
      valueInput = event.target.value;
    }
    setproductData({ ...productData, [event.target.name]: valueInput });
  };
  const saveProducto = (params) => {
    const res = axios.put(`http://localhost:8080/api/productos/${props.id}`, {
      timestamp: productData.timestamp,
      name: productData.name,
      descripcion: productData.description,
      code: productData.code,
      image: productData.image,
      price: productData.price,
      stock: productData.stock,
      admin: true,
    });
  };
  function format(date) {
    date = new Date(date);

    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();

    return year + "-" + month + "-" + day;
  }
  return (
    <div className={classes.editModal}>
      <form onSubmit={saveProducto}>
        <Input
          label="Name"
          input={{
            id: "name_" + props.id,
            type: "text",
            defaultValue: props.name,
            onChange: handleDataChange,
            name: "name",
          }}
        ></Input>
        <Input
          label="description"
          input={{
            id: "description_" + props.id,
            type: "text",
            defaultValue: props.description,
            onChange: handleDataChange,
            name: "description",
          }}
        ></Input>
        <Input
          label="Fecha"
          input={{
            id: "fecha_" + props.id,
            type: "date",
            defaultValue: format(props.timestamp),
            onChange: handleDataChange,
            name: "timestamp",
          }}
        ></Input>
        <Input
          label="Image"
          input={{
            id: "image_" + props.id,
            type: "text",
            defaultValue: props.image,
            onChange: handleDataChange,
            name: "image",
          }}
        ></Input>
        <Input
          label="Price"
          input={{
            id: "price_" + props.id,
            type: "number",
            defaultValue: props.price,
            onChange: handleDataChange,
            name: "price",
          }}
        ></Input>
        <Input
          label="Code"
          input={{
            id: "code_" + props.id,
            type: "number",
            defaultValue: props.code,
            onChange: handleDataChange,
            name: "code",
          }}
        ></Input>
        <Input
          label="Stock"
          input={{
            id: "stock_" + props.id,
            type: "number",
            defaultValue: props.stock,
            onChange: handleDataChange,
            name: "stock",
          }}
        ></Input>

        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>

          <button type="submit" className={classes["button--alt"]}>
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};
export default ProductEdit;
