import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "./models/User.js";

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const email = process.env.ADMIN_EMAIL;
  const exists = await User.findOne({ email });

  if (exists) {
    console.log("Admin already exists ✅");
    process.exit(0);
  }

  const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

  await User.create({
    fullName: "Admin Agency",
    email,
    password: hashed,
    role: "admin"
  });

  console.log("Admin created ✅", email);
  process.exit(0);
};

run();
