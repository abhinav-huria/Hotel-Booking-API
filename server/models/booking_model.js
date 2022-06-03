//DEPENDENCIES
import mongoose from "mongoose";

import { generateBookingId } from "../utilities/generateID.js";

//SCHEMA
const bookingSchema = new mongoose.Schema({
  _id: { type: String },
  endAt: {
    type: Date,
    required: true,
  },
  startAt: {
    type: Date,
    required: true,
  },
  totalPrice: Number,
  roomId: {
    type: String,
  },
  guests: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: String,
  hotelId: String,
});

bookingSchema.pre("save", async function (next) {
  try {
    this._id = generateBookingId();
    next();
  } catch (error) {
    next(error);
  }
});



//MODEL EXPORT
export default mongoose.model("Booking", bookingSchema);
