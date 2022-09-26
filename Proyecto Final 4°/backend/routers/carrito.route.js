import express from "express";

import { isAuth } from "../middlewares/authenticate.js";
import Carrito from "../services/carrito.js";
import Producto from "../services/producto.js";
import mongoose from "mongoose";
import * as cartController from "../controller/cart.controller.js";

const routerCarrito = express.Router();

routerCarrito.get("/", isAuth, cartController.getCart);

routerCarrito.post("/", isAuth, cartController.addProductToCart);

routerCarrito.delete("/:id", isAuth, cartController.deleteProductFromCart);

export default routerCarrito;
