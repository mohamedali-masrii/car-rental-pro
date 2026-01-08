import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.json(categories);
};

// Optionnel: créer catégories (admin)
export const createCategory = async (req, res) => {
  const { name, description, image } = req.body;
  const cat = await Category.create({ name, description, image });
  res.json(cat);
};
