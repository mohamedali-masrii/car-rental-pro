import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    cin: { type: String, required: true },
    days: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Reservation", reservationSchema);
