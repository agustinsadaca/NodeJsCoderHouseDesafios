import express from "express";

import { isAuth } from "../middlewares/authenticate.js";
import * as cartController from "../controllers/cart.controller.js";

const routerCarrito = express.Router();

routerCarrito.get("/", isAuth, cartController.getCart);

routerCarrito.post("/", isAuth, cartController.addProductToCart);

routerCarrito.delete("/:id", isAuth, cartController.deleteProductFromCart);

export default routerCarrito;
