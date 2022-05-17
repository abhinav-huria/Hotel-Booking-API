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
    }

    export const bookRoom = async (req, res) => {
        try {
            const booking = await Booking.create(req.body);
            try {
                await User.findByIdAndUpdate(req.params.userId, {
                  $push: { userBookings: booking._id },
                });
              } catch (err) {
                return res.status(500).json({
                  message: "Error in booking room",
                });
              }
            res.status(201).json(booking);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    export const deleteBooking = async (req, res) => {
        try {
            await Booking.findByIdAndDelete(req.params.bookingId);
            try {
                await User.findByIdAndUpdate(req.params.userId, {
                  $pull: { userBookings: req.params.bookingId },
                });
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
    }