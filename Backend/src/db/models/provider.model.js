import mongoose from "mongoose";

const providerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  type: { type: String, enum: ["Guide","Transport","Equipment","TourOperator"], required: true },
  trustScore: { type: Number, default: 100 },
  phoneNumber: { type: String, trim: true },
  email: { type: String, trim: true }
}, { timestamps: true });

export const Provider = mongoose.model("Provider", providerSchema);