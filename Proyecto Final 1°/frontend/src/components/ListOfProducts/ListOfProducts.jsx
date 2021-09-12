import ItemProducto from './ItemProducto';
import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';


const axios = require('axios');

async function getProducts(){
    let product = await  axios.get('http://localhost:8080/api/productos',{mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Credentials':true,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(function (response) {
            return response.data
        })

    return await product
}
const ListOfProducts = props =>{
    const [products, setProducts] = useState('')
    // let getProd
    getProducts().then( prod =>{  
        const listProds = prod.map(prod=>
            (
            <ItemProducto 
            key ={prod.id}
            timestamp={prod.timestamp}
            descripcion={prod.descripcion}
            foto={prod.foto}
            precio={prod.precio}
            stock={prod.stock}
            nombre={prod.nombre}
            ></ItemProducto>))
        setProducts(listProds)
    })
       console.log(products); 
    return( 
    <div>
        {products}
    </div>
    );
}
 
export default ListOfProducts;