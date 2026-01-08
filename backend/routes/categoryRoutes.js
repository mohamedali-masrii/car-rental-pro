import express from "express";
import Category from "../models/Category.js";
import { protect, adminOnly } from "../middleware/auth.js";
import multer from "multer";

const router = express.Router();

/* ===== upload image ===== */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

/* ===== GET categories (public) ===== */
router.get("/", async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  res.json(categories);
});

/* ===== ADD category (ADMIN) ===== */
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  async (req, res) => {
    const { name, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image obligatoire" });
    }

    const category = await Category.create({
      name,
      description,
      image: `/uploads/${req.file.filename}`,
    });

    res.json(category);
  }
);

/* ===== DELETE category (ADMIN) ===== */
router.delete("/:id", protect, adminOnly, async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Catégorie supprimée" });
});

export default router;
