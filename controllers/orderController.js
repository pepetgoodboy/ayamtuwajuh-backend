import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing user order for frontend
const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      name: req.body.name,
      address: req.body.address,
      paymentMethod: req.body.paymentMethod,
      phone: req.body.phone,
      items: req.body.items,
      amount: req.body.amount,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, {
      cartData: {},
    });
    res.status(200).json({ success: true, message: "Order Berhasil" });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

// Get user orders
const userOrder = async (req, res) => {
  try {
    const order = await orderModel.find({ userId: req.body.userId });
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

// Update status of order
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.status(200).json({ success: true, message: "Status Berhasil diubah" });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

export { placeOrder, userOrder, getAllOrders, updateStatus };
