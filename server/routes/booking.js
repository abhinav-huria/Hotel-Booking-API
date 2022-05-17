import express from "express";
import { verifyAdmin } from "../utilities/verifyToken";

const router = express.Router();

router.get("/getAllBookings",verifyAdmin, getBookings);
router.get("/:userId/:bookingId",verifyUser, getBooking);
router.post("/book/:userId/:roomId",verifyUser, bookRoom);
router.delete("/:userId/:bookingId",verifyUser, deleteBooking);

export default router;