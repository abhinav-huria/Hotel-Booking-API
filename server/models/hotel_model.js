import mongoose from "mongoose";
import { checkLength } from "../controllers/validation.js";

const HotelSchema = new mongoose.Schema({
  hotelName: {
    type: String,
    required: true,
    unique: true,
  },
  hotelCity: {
    type: String,
    required: true,
  },
  hotelAddress: {
    type: String,
    required: true,
  },
  hotelPhoneNumber: {
    type: String,
    required: true,
    unique: true,
    validate: checkLength(10),
  },
  hotelEmail: {
    type: String,
    required: true,
    unique: true,
  },
  photos: {
    type: [String],
    required: false,
  },
  hotelRating: {
    type: String,
    required: false,
  },
  hotelDescription: {
    type: String,
    required: true,
  },
  hotelAmenities: {
    type: [String], 
    required: false,
  },
  hotelRooms: {
    type: [String],
    required: false,
  },
 
});

export default mongoose.model("Hotel", HotelSchema);
