import express from "express";
import * as authenticate from "../middlewares/authenticate.js";
import Producto from "../services/producto.js";
import * as productController from "../controllers/product.controller.js";

const routerProducto = express.Router();

/* -------------------------------------------------------------------------- */
/*                                  Productos                                 */
/* -------------------------------------------------------------------------- */

routerProducto.get("/", authenticate.isAuth, productController.getAllProducts);

routerProducto.get("/:id", authenticate.isAuth, productController.getProductById);

routerProducto.post("/", authenticate.isAuth, productController.createProduct);

routerProducto.put("/:id",authenticate.isAuth,productController.updateProduct);

routerProducto.delete( "/:id",authenticate.isAuth,productController.deleteProduct);

export default routerProducto;
