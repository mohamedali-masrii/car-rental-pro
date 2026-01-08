import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const registerClient = async (req, res) => {
  try {
    const { nom, prenom, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email déjà utilisé" });

    const user = await User.create({ nom, prenom, email, password, role: "client" });

    res.json({
      user: { id: user._id, nom: user.nom, prenom: user.prenom, email: user.email, role: user.role },
      token: signToken(user._id)
    });
  } catch (e) {
    res.status(500).json({ message: "Erreur register" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Identifiants invalides" });

    const ok = await user.matchPassword(password);
    if (!ok) return res.status(400).json({ message: "Identifiants invalides" });

    res.json({
      user: { id: user._id, nom: user.nom, prenom: user.prenom, email: user.email, role: user.role },
      token: signToken(user._id)
    });
  } catch {
    res.status(500).json({ message: "Erreur login" });
  }
};
