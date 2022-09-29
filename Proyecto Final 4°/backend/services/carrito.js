import "../db.js";
import mongoose from "mongoose";

import { CarritoModel } from "../models/carrito.models.js";

/* -------------------------------------------------------------------------- */
/*                                   Carrito                                  */
/* -------------------------------------------------------------------------- */

class Carrito {
  constructor() {}
  async createCarrito(carrito) {
    try {
      const response = await CarritoModel.create(carrito);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  // createUser()

  async readAll(_id) {
    try {
      const response = await CarritoModel.findOne({ _id: _id });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  // readAll()

  async update(id, carrito) {
    const { timestampCarrito, producto } = carrito;
    const { timestamp, nombre, descripcion, codigo, foto, precio, stock } =
      producto;
    try {
      const response = await CarritoModel.updateOne(
        { _id: id },
        {
          timestampCarrito: timestampCarrito,
          producto: {
            timestamp: timestamp,
            nombre: nombre,
            descripcion: descripcion,
            codigo: codigo,
            foto: foto,
            precio: precio,
            stock: stock,
          },
        }
      );
      console.log(response);
      return id;
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(data) {
    const { _id, cart } = data;
    try {
      const response = await CarritoModel.updateOne({ _id: _id }, cart);

      console.log(response);
      return _id;
    } catch (error) {
      console.log(error);
    }
  }
  // update()

  async readOne(id) {
    try {
      const response = await CarritoModel.findOne({ _id: id });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async readOneUser(user) {
    try {
      const response = await CarritoModel.findOne({ user: user });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  // readOne()

  async deleteCarrito(idCarrito, carrito) {
    try {
      const response = await CarritoModel.updateOne(
        { _id: idCarrito },
        carrito
        // { $pop: { productos: { _id: mongoose.Types.ObjectId(idProducto) } } }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async emptyCart(idUser){
    try {
      const response = await CarritoModel.updateOne(
        { _id: idUser },
          {prods:[]}
        // { $pop: { productos: { _id: mongoose.Types.ObjectId(idProducto) } } }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export default Carrito;
