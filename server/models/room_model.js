//DEPENDENCIES
import mongoose from "mongoose";

import { generateRoomId } from "../utilities/generateID.js";

//SCHEMA
const RoomSchema = new mongoose.Schema(
  {
    _id: { type: String },
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },

    guestCapacity: {
      type: Number,
      required: true,
    },

    bedType: {
      type: String,
      required: true,
    },
   amenities: {
      type: [String],
      required: false,
    },
    hotelId: {
      type: String,
      required: true,
    },
    numberOfRooms: {
      type: Number,
      required: true,
    },
    roomsAvailable: [
      {
        datesBooked: { type: [String] },
      },
    ],
  },
  {
    timestamps: true,
  }
);


RoomSchema.pre("save", async function (next) {
  try {
    this._id = generateRoomId();
    next();
  } catch (error) {
    next(error);
  }
});


//MODEL EXPORT
export default mongoose.model("Room", RoomSchema);
