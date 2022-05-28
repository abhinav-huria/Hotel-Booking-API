import mongoose from "mongoose";
import { checkLength } from "../controllers/validation.js";

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    validate: checkLength(10),
  },
email: {
    type: String,
    required: true,
    unique: true,
  },
  photos: {
    type: [String],
    required: false,
  },
  rating: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  amenities: {
    type: [String], 
    required: false,
  },
  rooms: {
    type: [String],
    required: false,
  },
 
});

export default mongoose.model("Hotel", HotelSchema);
