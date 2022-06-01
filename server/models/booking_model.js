//DEPENDENCIES
import mongoose from "mongoose";

//SCHEMA
const bookingSchema = new mongoose.Schema({
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

//MODEL EXPORT
export default mongoose.model("Booking", bookingSchema);
