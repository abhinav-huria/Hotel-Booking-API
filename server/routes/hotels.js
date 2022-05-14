import express from "express";
import {
  addHotel,
  getHotel,
  getHotels,
  updateHotel,
} from "../controllers/hotel.js";

const router = express.Router();

router.get("/", getHotels);
router.get("/:id", getHotel);
router.post("/", addHotel);
router.put("/:id", updateHotel);

export default router;
