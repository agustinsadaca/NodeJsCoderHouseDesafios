import { buildSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql'

import {
  getProductos,
  getProducto,
  createProducto,
  updateProducto,
  deleteProducto,
} from '../services/graphql/producto'
import {
  getCarritos,
  getCarrito,
  createCarrito,
  updateCarrito,
  deleteCarrito,
} from '../services/graphql/Carrito'

const schema = buildSchema(`
  input ProductoInput {
    id: ID!
    timestamp: Int
    nombre:String
    description
    codigo: Int
    foto:String
    precio: Float
    
  }
  
  input CarritoInput {
    id: ID!
    timestampCarrito
    productos:[productoId]
  }

  type Producto {
    timestamp: Int
    nombre:String
    description
    codigo: Int
    foto:String
    precio: Float
  }

  type Carrito {
    timestampCarrito
    productos:[productoId]
  }

  type Query {
    getProducto(id: ID!): Producto
    getProductos(campo: String, valor: String): [Producto]
    getCarrito(id: ID!): Carrito
   
  }
  
  type Mutation {
    createProducto(datos: ProductoInput!): Producto
    updateProducto(id: ID!, datos: ProductoInput!): Producto
    deleteProducto(id: ID!): Producto
    createCarrito(datos: CarritoInput!): Carrito
    updateCarrito(id: ID!, datos: CarritoInput!): Carrito
    deleteCarrito(id: ID!): Carrito
  }
`)

export const graphqlMiddleware = graphqlHTTP({
  schema,
  rootValue: {
    getProductos,
    getProducto,
    createProducto,
    updateProducto,
    deleteProducto,
    getCarritos,
    getCarrito,
    createCarrito,
    updateCarrito,
    deleteCarrito,
  },
  graphiql: true,
})

