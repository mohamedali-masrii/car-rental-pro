import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    name: { type: String, required: true },
    color: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    image: { type: String, required: true } // chemin upload
  },
  { timestamps: true }
);

export default mongoose.model("Vehicle", vehicleSchema);
