import express from "express";
import {
  loginUser,
  registerUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.get("/verify/:token", verifyEmail);
userRouter.post("/forgot-password", forgotPassword);
userRouter.patch("/reset-password/:id", resetPassword);

export default userRouter;
