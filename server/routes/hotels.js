import express from "express";
import {
  addHotel,
  getHotel,
  getHotels,
  updateHotel,
  deleteHotel,
  getHotelByName,
  getHotelByCity
} from "../controllers/hotel.js";
import { verifyAdmin, verifyHotelOwner } from "../utilities/verifyToken.js";

const router = express.Router();

router.get("/", getHotels);
router.get("/:id", getHotel);
router.get("/name/:name", getHotelByName);
router.get("/city/:city", getHotelByCity);
router.post("/", verifyAdmin, addHotel);
router.put("/:id",verifyHotelOwner, updateHotel);
router.delete("/:id", verifyHotelOwner, deleteHotel);
export default router;
