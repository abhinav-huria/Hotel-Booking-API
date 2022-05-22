import express from "express";
import {
  addHotel,
  getHotel,
  getHotels,
  updateHotel,
  deleteHotel,
  getHotelByName,
  getHotelByCity,
  getCities
} from "../controllers/hotel.js";
import { verifyAdmin, verifyHotelOwner, verifyUser } from "../utilities/verifyToken.js";

const router = express.Router();

router.get("/",verifyUser, getHotels);
router.get("/:id", getHotel);
router.get("/name/:name", getHotelByName);
router.get("/city/:city", getHotelByCity);
router.post("/addhotel", addHotel);
router.put("/update/:id",verifyHotelOwner, updateHotel);
router.delete("/delete/:id", verifyHotelOwner, deleteHotel);
router.get("/availableCities/c", getCities);
export default router;
