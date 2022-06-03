import Room from "../models/room_model.js";
import Hotel from "../models/hotel_model.js";
import { getBookingDates } from "./validation.js";
export const addRoom = async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    const addedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(req.params.hotelId, {
        $push: { rooms: addedRoom._id },
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error adding room to hotel",
      });
    }
    res.status(201).json(addedRoom);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getRoomsByHotel = async (req, res) => {
  try {
    const start = req.query.start;
    const end = req.query.end;
     const bookingDates=getBookingDates(start,end);
    const rooms = await Room.find({ hotelId: req.params.hotelId });
let avail=[];
    rooms.filter((room) => {
      if(room.numberOfRooms> room.roomsAvailable.length){
       avail.push(room);
      }
      else{
        for (let i = 0; i < room.roomsAvailable.length; i++) {
          if (
            bookingDates.some((date) =>
              !room.roomsAvailable[i].datesBooked.includes(date)
            )
          ) {
            avail.push(room);
            break;
          }}
      }
   }
    );
      
    res.status(200).json(avail);
 
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteRoom = async (req, res) => {
  const hotelId = req.params.hotelId;
  try {
    await Room.findByIdAndDelete(req.params.roomId);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { hotelRooms: req.params.roomId },
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error deleting room from hotel",
      });
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const roomAvailability = async (req, res) => {
  try {
    await Room.updateOne(
      { "numberOfRooms._id": req.params.id },
      {
        $push: {
          "numberOfRooms.$.datesBooked": req.body.dates,
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json(error);
  }
};


