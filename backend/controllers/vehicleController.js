import Vehicle from "../models/Vehicle.js";
import Category from "../models/Category.js";

export const getVehiclesByCategoryName = async (req, res) => {
  const { name } = req.params;
  const cat = await Category.findOne({ name });
  if (!cat) return res.status(404).json({ message: "Catégorie introuvable" });

  const vehicles = await Vehicle.find({ category: cat._id }).sort({ createdAt: -1 });
  res.json(vehicles);
};

export const getVehicleById = async (req, res) => {
  const v = await Vehicle.findById(req.params.id).populate("category");
  if (!v) return res.status(404).json({ message: "Véhicule introuvable" });
  res.json(v);
};

export const createVehicle = async (req, res) => {
  const { categoryName, name, color, pricePerDay } = req.body;

  const cat = await Category.findOne({ name: categoryName });
  if (!cat) return res.status(404).json({ message: "Catégorie introuvable" });

  const image = req.file ? `/uploads/${req.file.filename}` : "";

  const vehicle = await Vehicle.create({
    name,
    color,
    pricePerDay,
    image,
    category: cat._id
  });

  res.json(vehicle);
};

export const updateVehicle = async (req, res) => {
  const v = await Vehicle.findById(req.params.id);
  if (!v) return res.status(404).json({ message: "Véhicule introuvable" });

  v.name = req.body.name ?? v.name;
  v.color = req.body.color ?? v.color;
  v.pricePerDay = req.body.pricePerDay ?? v.pricePerDay;

  if (req.file) v.image = `/uploads/${req.file.filename}`;

  await v.save();
  res.json(v);
};

export const deleteVehicle = async (req, res) => {
  const v = await Vehicle.findById(req.params.id);
  if (!v) return res.status(404).json({ message: "Véhicule introuvable" });

  await v.deleteOne();
  res.json({ message: "Supprimé" });
};
