import express from "express";
import multer from "multer";
import Vehicle from "../models/Vehicle.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// list by category (both)
router.get("/category/:categoryId", protect, async (req, res) => {
  const vehicles = await Vehicle.find({ category: req.params.categoryId }).sort({ createdAt: -1 });
  res.json(vehicles);
});

// admin add vehicle with upload
router.post("/", protect, adminOnly, upload.single("image"), async (req, res) => {
  const { category, name, color, pricePerDay } = req.body;
  if (!req.file) return res.status(400).json({ message: "Image required" });

  const vehicle = await Vehicle.create({
    category,
    name,
    color,
    pricePerDay: Number(pricePerDay),
    image: `/uploads/${req.file.filename}`
  });
  res.json(vehicle);
});

router.put("/:id", protect, adminOnly, upload.single("image"), async (req, res) => {
  const { name, color, pricePerDay } = req.body;
  const update = { name, color, pricePerDay: Number(pricePerDay) };
  if (req.file) update.image = `/uploads/${req.file.filename}`;

  const v = await Vehicle.findByIdAndUpdate(req.params.id, update, { new: true });
  res.json(v);
});

router.delete("/:id", protect, adminOnly, async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
