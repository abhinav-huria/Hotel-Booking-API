//DEPENDENCIES
import mongoose from "mongoose";

//SCHEMA
const RoomSchema = new mongoose.Schema(
  {
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

//MODEL EXPORT
export default mongoose.model("Room", RoomSchema);
