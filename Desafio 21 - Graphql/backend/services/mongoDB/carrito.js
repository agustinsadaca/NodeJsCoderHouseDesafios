import "../../db.js";
import { CarritoModel } from "../../models/carrito.models.js";

/* -------------------------------------------------------------------------- */
/*                                   Carrito                                  */
/* -------------------------------------------------------------------------- */

class Carrito {
  constructor() {}
  async createCarrito(carrito) {
    try {
      const firstElem = await CarritoModel.find()
      const response = await CarritoModel.updateOne({_id:firstElem[0]._id},{"$push":{producto:carrito.producto}})

    } catch (error) {
      console.log(error);
    }
  }

  // createUser()

  async readAll() {
    try {
      const response = await CarritoModel.find();
      console.log(response);
      return(response);
    } catch (error) {
      console.log(error);
    }
  }

  // readAll()

  async update(id,carrito) {
    const { timestampCarrito,producto} = carrito
    const {timestamp, nombre, descripcion, codigo, foto, precio, stock} = producto
    try {
      const response = await CarritoModel.updateOne(
        { _id:id },
        {timestampCarrito:timestampCarrito, producto:{timestamp:timestamp, nombre:nombre, descripcion:descripcion, codigo:codigo, foto:foto, precio:precio, stock:stock} }
      );
      console.log(response);
      return id
    } catch (error) {
      console.log(error);
    }
  }
  // update()

  async readOne(id) {
    try {
      const response = await CarritoModel.findOne({ _id:id });
      console.log(response);
      return response
    } catch (error) {
      console.log(error);
    }
  }

  // readOne()

  async deleteCarrito(id, idCarr) {
    try {
      const response = await CarritoModel.updateOne({ _id:id },{"$pull":{"producto":{"_id":idCarr}}});
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}

export default Carrito;
