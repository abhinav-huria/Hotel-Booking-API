import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  endAt: { type: Date, required: "Ending Date is required!" },
  startAt: { type: Date, required: "Start Date is required!" },
  totalPrice: Number,
roomId:{
    type: String,
},
  guests: Number,
  createdAt: { type: Date, default: Date.now },
  user: { userId: String },
});

export default model("Booking", bookingSchema);
