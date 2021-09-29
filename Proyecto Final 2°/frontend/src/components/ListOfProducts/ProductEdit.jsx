import React, { Component, useState } from "react";
import Input from "../UI/Input";
import classes from './ProductEdit.module.css'
import axios from 'axios'

const ProductEdit = (props) => {
  const [productData, setproductData] = useState({
    timestamp: props.timestamp,
    nombre: props.nombre,
    fecha: props.fecha,
    descripcion: props.descripcion,
    codigo: props.codigo,
    foto: props.foto,
    precio: props.precio,
    stock: props.stock,
   
  })
  const handleDataChange = (event) => {
    setproductData({...productData,[event.target.name]:event.target.value})
  }
  const saveProducto = (params) => {
    const res =  axios.put(`http://localhost:8080/api/productos/${props.id}`,{
      "timestamp": productData.timestamp,
      "nombre": productData.nombre,
      "descripcion": productData.descripcion,
      "codigo": productData.codigo,
      "foto": productData.foto,
      "precio": productData.precio,
      "stock": productData.stock,
      "admin":true
    })
  }
  function format(date) {
    date = new Date(date);
  
    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();
  
    return year + '-' + month + '-' + day;
  }
  return (
    <div className={classes.editModal}>
      <form  onSubmit={saveProducto}>
        <Input
          label="Nombre"
          input={{
            id: "nombre_" + props.id,
            type: "text",
            defaultValue:props.nombre,
            onChange:handleDataChange,
            name:'nombre'
          }}
        ></Input>
        <Input
          label="Descripcion"
          input={{
            id: "descripcion_" + props.id,
            type: "text",
            defaultValue:props.descripcion,
            onChange:handleDataChange,
            name:'descripcion'
          }}
        ></Input>
        <Input
          label="Fecha"
          input={{
            id: "fecha_" + props.id,
            type: "date",
            defaultValue:format(props.timestamp),
            onChange:handleDataChange,
            name:'fecha'
          }}
        ></Input>
        <Input
          label="Foto"
          input={{
            id: "foto_" + props.id,
            type: "text",
            defaultValue:props.foto,
            onChange:handleDataChange,
            name:'foto'
          }}
        ></Input>
        <Input
          label="Precio"
          input={{
            id: "precio_" + props.id,
            type: "number",
            defaultValue:props.precio,
            onChange:handleDataChange,
            name:'precio'
          }}
        ></Input>
        <Input
          label="Codigo"
          input={{
            id: "codigo_" + props.id,
            type: "number",
            defaultValue:props.codigo,
            onChange:handleDataChange,
            name:'codigo'
          }}
        ></Input>
        <Input
          label="Stock"
          input={{
            id: "stock_" + props.id,
            type: "number",
            defaultValue:props.stock,
            onChange:handleDataChange,
            name:'stock'
          }}
        ></Input>

        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
       
          <button type="submit" className={classes["button--alt"]} >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};
export default ProductEdit;
