import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import crypto from "crypto";
import {
  sendEmailVerification,
  sendResetPassword,
} from "../controllers/nodemailer.js";

// Create Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User tidak ditemukan" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Password yang anda masukkan salah!",
      });
    }

    //  Check if user is verified
    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Silahkan verifikasi email terlebih dahulu",
      });
    }

    const token = createToken(user._id);
    res.status(200).json({ success: true, token, role: user.role });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

// Register
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    const exists = await userModel.findOne({ email: email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Email sudah terdaftar!" });
    }

    // Validating email format & strong password
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Masukkan email dengan benar!" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password harus lebih dari 8 karakter!",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate Token for Verifycation Email
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      verifyToken: verificationToken,
    });

    // Save user
    const user = await newUser.save();

    // Send Email Verification
    await sendEmailVerification(email, verificationToken);
    res.status(201).json({
      success: true,
      message:
        "Registrasi Berhasil, silahkan cek email untuk verifikasi akun anda.",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: console.log(error) });
  }
};

// Verify Email
const verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const user = await userModel.findOne({
      verifyToken: token,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Link tidak valid atau sudah kedaluwarsa.",
      });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Berhasil verifikasi email!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Send Reset Password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User tidak ditemukan" });
    }
    await sendResetPassword(email, user._id);
    await user.save();
    res.status(200).json({
      success: true,
      message: "Silahkan cek email anda untuk mereset password",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Reset Password User
const resetPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User tidak ditemukan" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await userModel.findByIdAndUpdate(id, { password: hashedPassword });

    res.status(200).json({
      success: true,
      message: "Password anda telah diperbarui",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, verifyEmail, forgotPassword, resetPassword };
