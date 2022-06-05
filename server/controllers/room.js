import Room from "../models/room_model.js";
import Hotel from "../models/hotel_model.js";
import { getBookingDates } from "./validation.js";
export const addRoom = async (req, res) => {
  try {
    const hotelId = req.body.hotelId;
    const newRoom = new Room(req.body);
    const addedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
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
    const rooms = await Room.find({ hotelId: req.params.hotelId });
    if (rooms.length === 0) {
      return res.status(404).json({ message: "Rooms not found" });
    }
    let start = req.query.start;
    let end = req.query.end;
    if (start.length === 10 && end.length === 10) {
      start = new Date(start).getTime();
      end = new Date(end).getTime();
    }

    if (!start && !end) {
      return res.status(200).json(rooms);
    }
    const bookingDates = getBookingDates(start, end);

    let avail = [];
    rooms.filter((room) => {
      if (room.numberOfRooms > room.roomsAvailable.length) {
        avail.push(room);
      } else {
        for (let i = 0; i < room.roomsAvailable.length; i++) {
          if (
            bookingDates.some(
              (date) => !room.roomsAvailable[i].datesBooked.includes(date)
            )
          ) {
            avail.push(room);
            break;
          }
        }
      }
    });

    res.status(200).json(avail);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
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
    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.roomId);
    if (!deletedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    await Hotel.findByIdAndUpdate(deletedRoom.hotelId, {
      $pull: { rooms: deletedRoom._id },
    });
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    if (rooms.length === 0) {
      return res.status(404).json({ message: "Rooms not found" });
    }
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json(error);
  }
};
