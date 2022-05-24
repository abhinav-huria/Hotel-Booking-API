import Booking from "../models/booking_model.js";
import User from "../models/customer_model.js";
import Room from "../models/room_model.js";

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const bookRoom = async (req, res) => {
  let booking = null;
  try {
    const { startAt, endAt, roomId, userId } = req.body;
    console.log(req.body);
    const room = await Room.findById(roomId);
    const user = await User.findById(userId);
    if (room.roomsAvailable.length < room.numberOfRooms) {
      console.log("room available");
      booking = await Booking.create(req.body);
      try {
        await User.findByIdAndUpdate(req.params.userId, {
          $push: { userBookings: booking._id },
        })
        await Room.findByIdAndUpdate(req.params.roomId, {
          $push: { roomsAvailable: [{ datesBooked: [startAt, endAt] }] },
        })

      } catch (err) {
        console.log(err);
        return res.status(500).json({
          message: "Error in booking room",
        });
      }
      return res.status(200).json(booking);

    } else {
      console.log("room not available");
      for (let i = 0; i < room.roomsAvailable.length; i++) {
        if (
          room.roomsAvailable[i].datesBooked.includes(startAt) ||
          room.roomsAvailable[i].datesBooked.includes(endAt)
        ) {
          if (i === room.roomsAvailable.length - 1) {
            return res.status(400).json({
              message: "Room is not available for the dates you have selected",
            });
          }
        } else {
          booking = await Booking.create(req.body);
          try {
            await User.findByIdAndUpdate(req.params.userId, {
              $push: { userBookings: booking._id },
            });
            let newDates = room.roomsAvailable[i].datesBooked;
            newDates.push(startAt, endAt);

            await Room.findByIdAndUpdate(roomId, {
              //$pull : { roomsAvailable: { datesBooked: room.roomsAvailable[i].datesBooked } },
              $push: { roomsAvailable: [{ datesBooked: newDates }] },
            });
            return res.status(201).json(booking);
          } catch (err) {
            console.log(err);
            return res.status(500).json({
              message: "Error in booking room",
            });
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.bookingId);
    try {
      await User.findByIdAndUpdate(req.params.userId, {
        $pull: { userBookings: req.params.bookingId },
      });
      // await Room.findByIdAndUpdate(req.params.roomId, {
      //   $pull: { roomsAvailable: { datesBooked: [req.body.startAt, req.body.endAt] } },
      // });
    } catch (err) {
      return res.status(500).json({
        message: "Error in booking room",
      });
    }
    res.status(200).json({
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
