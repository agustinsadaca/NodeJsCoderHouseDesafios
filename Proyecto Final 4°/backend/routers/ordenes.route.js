import express from "express";
import { isAuth } from "../middlewares/authenticate.js";
import * as orderController from "../controllers/order.controller.js";

const routerOrdenes = express.Router();

routerOrdenes.get("/", isAuth, orderController.getCart);

routerOrdenes.post("/", isAuth, orderController.addProductToCart);


export default routerOrdenes;
