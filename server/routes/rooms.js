//DEPENDENCIES
import express from "express";

//CONTROLLER(S)
import {
  addRoom,
  getRoomsByHotel,
  getRoom,
  updateRoom,
  deleteRoom,
  roomAvailability,
  getAllRooms,
} from "../controllers/room.js";

//VERIFICATION
import {
  verifyHotelOwner,
  verifyUser,
  verifyAdmin,
} from "../utilities/verifyToken.js";

//ROUTER
const router = express.Router();

//ADD ROOM(HOTEL OWNER/ADMIN ONLY)
router.post("/addRoom/:hotelId", verifyHotelOwner, addRoom);

//GET HOTEL ROOMS(PUBLIC)
router.get("/getRooms/:hotelId", getRoomsByHotel);

//GET ROOM DETAILS(PUBLIC)
router.get("/getRoom/:id", getRoom);

//GET ALL ROOMS(ADMIN ONLY)
router.get("/", verifyAdmin, getAllRooms);

//UPDATE/DELETE ROOM(HOTEL OWNER/ADMIN ONLY)
router.put("/updateRoom/:id", verifyHotelOwner, updateRoom);
router.delete("/deleteRoom/:hotelId/:roomId", verifyHotelOwner, deleteRoom);

//MODIFY ROOM AVAILABILITY(USER ONLY)
router.put("/roomAvailability/:id", verifyUser, roomAvailability);

export default router;
