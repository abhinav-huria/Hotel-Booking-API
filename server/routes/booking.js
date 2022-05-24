import express from "express";
import { verifyAdmin,verifyUser } from "../utilities/verifyToken.js";
import { getBooking,getBookings,bookRoom, deleteBooking } from "../controllers/booking.js";
const router = express.Router();

router.get("/getAllBookings",verifyAdmin, getBookings);
// router.get("/:bookingId",verifyUser, getBooking);
router.get("/:bookingId", getBooking);

router.post("/book/:userId/:roomId",verifyUser, bookRoom);
// router.post("/book/:userId/:roomId", bookRoom);

router.delete("/delete/:bookingId",verifyUser, deleteBooking);

export default router;