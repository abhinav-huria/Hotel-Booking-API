import mongoose from "mongoose";

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

    numOfBeds: {
      type: Number,
      required: true,
    },
    bedType: {
      type: String,
      required: true,
    },
    internet: {
      type: Boolean,
      default: false,
    },

    breakfast: {
      type: Boolean,
      default: false,
    },

    airConditioned: {
      type: Boolean,
      default: false,
    },
    hotelId: {
      type: String,
      required: true,
    },
    numberOfRooms: [
      {
        number: Number,
        datesBooked: { type: [Date] },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Room", RoomSchema);
