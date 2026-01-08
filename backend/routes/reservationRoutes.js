import express from "express";
import Reservation from "../models/Reservation.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// client create reservation
router.post("/", protect, async (req, res) => {
  const { vehicle, firstName, lastName, phone, cin, days } = req.body;

  const r = await Reservation.create({
    client: req.user._id,
    vehicle,
    firstName,
    lastName,
    phone,
    cin,
    days: Number(days)
  });

  res.json(r);
});

// client my reservations
router.get("/me", protect, async (req, res) => {
  const list = await Reservation.find({ client: req.user._id })
    .populate("vehicle")
    .sort({ createdAt: -1 });
  res.json(list);
});

// admin all reservations
router.get("/", protect, adminOnly, async (req, res) => {
  const list = await Reservation.find()
    .populate("client", "fullName email")
    .populate("vehicle")
    .sort({ createdAt: -1 });
  res.json(list);
});

export default router;
