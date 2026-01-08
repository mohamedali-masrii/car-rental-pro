import Reservation from "../models/Reservation.js";
import Vehicle from "../models/Vehicle.js";

export const createReservation = async (req, res) => {
  const { vehicleId, nom, prenom, tel, cin, days } = req.body;

  const vehicle = await Vehicle.findById(vehicleId);
  if (!vehicle) return res.status(404).json({ message: "Véhicule introuvable" });

  const total = Number(days) * Number(vehicle.pricePerDay);

  const r = await Reservation.create({
    user: req.user._id,
    vehicle: vehicle._id,
    nom,
    prenom,
    tel,
    cin,
    days,
    total
  });

  res.json(r);
};

export const getMyReservations = async (req, res) => {
  const list = await Reservation.find({ user: req.user._id })
    .populate("vehicle")
    .sort({ createdAt: -1 });
  res.json(list);
};

export const getAllReservations = async (req, res) => {
  const list = await Reservation.find()
    .populate("user", "nom prenom email")
    .populate("vehicle")
    .sort({ createdAt: -1 });
  res.json(list);
};
