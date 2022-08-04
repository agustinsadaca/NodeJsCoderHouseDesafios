import React, { Component, useState } from "react";
import Input from "../UI/Input";
import classes from './ProductAdd.module.css'
import axios from 'axios'

const ProductAdd = (props) => {
  const [productData, setproductData] = useState({
    timestamp: props.timestamp,
    nombre: '',
    fecha: '',
    descripcion: '',
    codigo: '',
    foto: '',
    precio: '',
    stock: '',
   
  })
  const handleDataChange = (event) => {
    setproductData({...productData,[event.target.name]:event.target.value})
  }
  const handleDateChange = (event) => {
    let datum = Date.parse(event.target.value);
    let timestampp = datum/1000;
    setproductData({...productData,timestamp:timestampp})
  }
  const saveProducto = (params) => {
    const res =  axios.post(`http://localhost:8080/api/productos`,{
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
      <form onSubmit={saveProducto}>
        <Input
          label="Nombre"
          input={{
            id: "nombre_" ,
            type: "text",
            
            onChange: handleDataChange,
            name: "nombre",
          }}
        ></Input>
        <Input
          label="Descripcion"
          input={{
            id: "descripcion_" ,
            type: "text",
            
            onChange: handleDataChange,
            name: "descripcion",
          }}
        ></Input>
        <Input
          label="Fecha"
          input={{
            id: "fecha_" ,
            type: "date",
            
            onChange: handleDateChange,
            name: "fecha",
          }}
        ></Input>
        <Input
          label="Foto"
          input={{
            id: "foto_" ,
            type: "text",
            
            onChange: handleDataChange,
            name: "foto",
          }}
        ></Input>
        <Input
          label="Precio"
          input={{
            id: "precio_" ,
            type: "number",
            
            onChange: handleDataChange,
            name: "precio",
          }}
        ></Input>
        <Input
          label="Codigo"
          input={{
            id: "codigo_" ,
            type: "number",
           
            onChange: handleDataChange,
            name: "codigo",
          }}
        ></Input>
        <Input
          label="Stock"
          input={{
            id: "stock_" ,
            type: "number",
            
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

export default ProductAdd;
