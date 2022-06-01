//DEPENDENCIES
import express from "express";

//CONTROLLER(S)
import { getBooking,getBookings,bookRoom, deleteBooking ,getUserBookings} from "../controllers/booking.js";

//VERIFICATION
import { verifyAdmin,verifyUser } from "../utilities/verifyToken.js";

//ROUTER
const router = express.Router();

//GET ALL BOOKINGS(ADMIN ONLY)
router.get("/getAllBookings",verifyAdmin, getBookings);

//GET BOOKING DETAILS(USER ONLY)
router.get("/:bookingId", getBooking);
// router.get("/:bookingId",verifyUser, getBooking);

//BOOK ROOM(USER ONLY)
router.post("/book/:userId/:roomId",verifyUser, bookRoom);
// router.post("/book/:userId/:roomId", bookRoom);

//DELETE BOOKING(USER ONLY)
router.delete("/delete/:bookingId",verifyUser, deleteBooking);

//GET USER BOOKINGS
router.get("/mybookings/:userId",verifyUser, getUserBookings);

//EXPORT
export default router;