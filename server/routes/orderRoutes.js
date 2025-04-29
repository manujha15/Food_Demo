import express from "express";
import authMiddleware from "../controllers/orderController.js"
import {placeOrder,verifyOrder,userOrders} from "../controllers/orderController.js"


const router = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",authMiddleware,userOrders)
export default router;
