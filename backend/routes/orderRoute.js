import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import { placeOrder, verifyOrder,userOrders, listOrders, updateStatus } from "../controllers/orderController.js";

const OrderRoute = express.Router();

OrderRoute.post("/place", authMiddleware, placeOrder)
OrderRoute.post("/verify",verifyOrder)
OrderRoute.post("/userorders", authMiddleware,userOrders);
OrderRoute.get("/list", listOrders);
OrderRoute.post("/status", updateStatus)

export default OrderRoute;