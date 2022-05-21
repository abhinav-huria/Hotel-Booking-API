import express from "express";
import { verifyAdmin,verifyUser } from "../utilities/verifyToken.js";
import { getBooking,getBookings,bookRoom, deleteBooking } from "../controllers/booking.js";
const router = express.Router();

router.get("/getAllBookings",verifyAdmin, getBookings);
router.get("/:bookingId",verifyUser, getBooking);
// router.post("/book/:userId/:roomId",verifyUser, bookRoom);
router.post("/book/:userId/:roomId", bookRoom);

router.delete("/:userId/:bookingId",verifyUser, deleteBooking);

export default router;