import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import "dotenv/config";
import userRouter from "./routes/userRoute.js";
import foodDrinkRouter from "./routes/foodDrinkRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// App Config
const app = express();
const port = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "https://ayam-tuwajuh.vercel.app/",
  })
);

// DB Connection
connectDB();

// API Endpoints
app.use("/api/user", userRouter);
app.use("/images", express.static("uploads"));
app.use("/api/foodDrink", foodDrinkRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.get("/", (req, res) => {
  res.send("API Running");
});

// Listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
