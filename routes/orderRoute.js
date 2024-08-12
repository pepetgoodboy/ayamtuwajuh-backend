import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  placeOrder,
  userOrder,
  getAllOrders,
  updateStatus,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.get("/userorder", authMiddleware, userOrder);
orderRouter.get("/all", getAllOrders);
orderRouter.patch("/status", updateStatus);

export default orderRouter;
