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
  totalPrice: {
    type: Number,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
  },
  guests: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId:{
    type: String,
    required: true,
  },
  hotelId: {
    type: String,
    required: true,
  },
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
