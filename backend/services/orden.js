import "../db.js";
import {OrdenModel} from "../models/ordenes.models.js";
import { v4 as uuidv4 } from 'uuid';

/* -------------------------------------------------------------------------- */
/*                                   Orden                                  */
/* -------------------------------------------------------------------------- */

class Orden {
  constructor() {}
  async createOrden(carrito) {
    try {
      const id = uuidv4().replace(/-/g, "")
      carrito.idCliente = carrito._id
      carrito._id = id
      console.log("order",carrito);

      const response = await OrdenModel.create(carrito);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error
    }
  }

  // createUser()

  async readAll() {
    try {
      const response = await OrdenModel.findOne({ _id: _id });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async readOrdersUser(id) {
    try {
      const response = await OrdenModel.find({ idCliente: id });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  // readAll()

  async readOrdenesUser(id) {
    try {
      const response = await OrdenModel.findOne({ _id: id });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }


}

export default Orden;
