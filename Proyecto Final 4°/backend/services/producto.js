import "../db.js";
import { ProductosModel } from "../models/productos.models.js";
import { v4 as uuidv4 } from 'uuid';


/* -------------------------------------------------------------------------- */
/*                                  Productos                                 */
/* -------------------------------------------------------------------------- */
class Producto {
  constructor() {}
  async createProducto(producto) {
    try {
      const id = uuidv4().replace(/-/g, "")
      console.log(id);
      const response = await ProductosModel.create({...producto,_id:id});
      console.log(response);
      return response
    } catch (error) {
      console.log(error);
    }
  }

  // createUser()

  async readAll() {
    try {
      const response = await ProductosModel.find();
      console.log(response);
      return(response);
    } catch (error) {
      console.log(error);
    }
  }

  // readAll()

  async update(id,producto) {
    const {timestamp, name, description, code, image, price, stock} = producto
    try {
      const response = await ProductosModel.updateOne(
        { _id:id },
        { timestamp:timestamp, name:name, description:description, code:code, image:image, price:price, stock:stock }
      );
      console.log(response);
      return 
    } catch (error) {
      console.log(error);
    }
  }
  // update()

  async readOne(id) {
    try {
      const response = await ProductosModel.findOne({ _id:id });
      console.log(response);
      return response
    } catch (error) {
      console.log(error);
    }
  }

  // readOne()

  async deleteProducto(id) {
    try {
      const response = await ProductosModel.deleteOne({ _id:id });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

 
}
export default Producto

