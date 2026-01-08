import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// Register client only
router.post("/register", async (req, res) => {
  const { fullName, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already used" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ fullName, email, password: hashed, role: "client" });

  res.json({
    token: signToken(user._id),
    user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role }
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: "Invalid credentials" });

  res.json({
    token: signToken(user._id),
    user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role }
  });
});

export default router;
