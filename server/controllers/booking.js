//MODEL IMPORT(S)
import Booking from "../models/booking_model.js";
import User from "../models/customer_model.js";
import Room from "../models/room_model.js";

//VALIDATION IMPORT(S)
import { getBookingDates } from "./validation.js";
import { sendBookingConfirmation } from "../utilities/mail.js";

//CONTROLLER FUNCTION(S)
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({});
    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) {
      return res.status(404).json({ message: "The booking doesn't exist" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const bookRoom = async (req, res) => {
  let booking = null;
  let bookingDates = [];

  try {
    const { startAt, endAt, roomId, userId } = req.body;

    const room = await Room.findById(roomId);
    const user = await User.findById(userId);
    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    bookingDates = getBookingDates(
      new Date(Number(startAt)).getTime(),
      new Date(Number(endAt)).getTime()
    );
    if (room.roomsAvailable.length < room.numberOfRooms) {
      booking = await Booking.create(req.body);
      try {
        await User.findByIdAndUpdate(req.params.userId, {
          $push: { userBookings: booking._id },
        });
        await Room.findByIdAndUpdate(req.params.roomId, {
          $push: { roomsAvailable: [{ datesBooked: bookingDates }] },
        });
      } catch (err) {
        return res.status(500).json({
          message: "Error in booking room",
        });
      }
      sendBookingConfirmation(user.userEmail, booking);
      return res.status(200).json(booking);
    } else {
      for (let i = 0; i < room.roomsAvailable.length; i++) {
        if (
          bookingDates.some(
            (date) => !room.roomsAvailable[i].datesBooked.includes(date)
          )
        ) {
          let bookedRoomDates = room.roomsAvailable[i].datesBooked;
          for (let k = 0; k < bookingDates.length; k++) {
            bookedRoomDates.push(bookingDates[k]);
          }

          let index1 = `roomsAvailable.${i}.datesBooked`;
          booking = await Booking.create(req.body);
          try {
            await User.findByIdAndUpdate(req.params.userId, {
              $push: { userBookings: booking._id },
            });
            await Room.updateOne(
              {
                _id: roomId,
                "roomsAvailable.": room.roomsAvailable[i]._id.toString(),
              },
              {
                $set: {
                  [index1]: bookedRoomDates,
                },
              }
            );
            sendBookingConfirmation(user.userEmail, booking);
            return res.status(200).json(booking);
          } catch (err) {
            return res.status(500).json({
              message: "Error in booking room",
            });
          }
        } else {
          console.log(i);
        }
      }
      return res.status(404).json({
        message: "Room not available",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(
      req.params.bookingId
    );
    if (!deletedBooking) {
      return res.status(404).json({ message: "The booking doesn't exist" });
    }
    try {
      await User.findByIdAndUpdate(req.params.userId, {
        $pull: { userBookings: req.params.bookingId },
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error in deleting booking",
      });
    }
    res.status(200).json({
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const bookings = await Booking.find({ userId: req.params.userId });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json(error);
  }
};
