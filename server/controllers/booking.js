//MODEL IMPORT(S)
import Booking from "../models/booking_model.js";
import User from "../models/customer_model.js";
import Room from "../models/room_model.js";

//VALIDATION IMPORT(S)
import { getBookingDates } from "./validation.js";

//CONTROLLER FUNCTION(S)
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
  let bookingDates = [];

  try {
    const { startAt, endAt, roomId, userId } = req.body;
    console.log(new Date(startAt));
    console.log(req.body);
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
    console.log(bookingDates);
    if (room.roomsAvailable.length < room.numberOfRooms) {
      console.log("room available");
      booking = await Booking.create(req.body);
      try {
        await User.findByIdAndUpdate(req.params.userId, {
          $push: { userBookings: booking._id },
        });
        await Room.findByIdAndUpdate(req.params.roomId, {
          $push: { roomsAvailable: [{ datesBooked: bookingDates }] },
        });
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
          bookingDates.some((date) =>
            !room.roomsAvailable[i].datesBooked.includes(date)
          )
        ) {
          console.log(new Date(bookingDates[0]));
          console.log("new break");
         // break;
          let bookedRoomDates = room.roomsAvailable[i].datesBooked;
          for (let k = 0; k < bookingDates.length; k++) {
            bookedRoomDates.push(bookingDates[k]);
          }

          let index1 = `roomsAvailable.${i}.datesBooked`;
          console.log(index1);
          booking = await Booking.create(req.body);
          console.log(room.roomsAvailable[i]._id.toString());
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
                 // datesBooked: bookedRoomDates,
                },
              }
            );
            return res.status(200).json(booking);
            //             await Room.findByIdAndUpdate(req.params.roomId, {
            // $set:{ index1: bookedRoomDates},
            //               });
          } catch (err) {
            console.log(err + "----");
            return res.status(500).json({
              message: "Error in booking room",
            });
          }
         // return res.status(200).json(booking);
        }
        else{
          console.log(i +"___________________")
        }
       // return res.status(200).send(booking);
      }
      return res.status(404).json({
        message: "Room not available",
      });
    }
  } catch (error) {
    console.log("yahan");
    res.status(500).json(error);
  }
};

//           room.roomsAvailable[i].datesBooked.includes(bookingDates.some()) || //if the first date is already booked
//           room.roomsAvailable[i].datesBooked.includes(bookingDates[bookingDates.length - 1]) //if the last date is already booked
//         ) {
//           if (i === room.roomsAvailable.length - 1) {
//             return res.status(400).json({
//               message: "Room is not available for the dates you have selected",
//             });
//           }
//         } else {
//           booking = await Booking.create(req.body);
//           try {
//             await User.findByIdAndUpdate(req.params.userId, {
//               $push: { userBookings: booking._id },
//             });
//             let newDates = room.roomsAvailable[i].datesBooked;
//             newDates.push(startAt, endAt);

//             await Room.findByIdAndUpdate(roomId, {
//               //$pull : { roomsAvailable: { datesBooked: room.roomsAvailable[i].datesBooked } },
//               $push: { roomsAvailable: [{ datesBooked: newDates }] },
//             });
//             return res.status(201).json(booking);
//           } catch (err) {
//             console.log(err);
//             return res.status(500).json({
//               message: "Error in booking room",
//             });
//           }
//         }
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// };

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

export const getUserBookings = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    console.log(req.params.userId);
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
