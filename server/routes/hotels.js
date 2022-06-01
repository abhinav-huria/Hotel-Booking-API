//DEPENDENCIES
import express from "express";

//CONTROLLER(S)
import {
  addHotel,
  getHotel,
  getHotels,
  updateHotel,
  deleteHotel,
  getHotelByName,
  getHotelByCity,
  getCities,
} from "../controllers/hotel.js";

//VERIFICATION
import {
  verifyAdmin,
  verifyHotelOwner,
  verifyUser,
} from "../utilities/verifyToken.js";

//ROUTER
const router = express.Router();

//GET ALL HOTELS(ADMIN ONLY)
router.get("/", verifyAdmin, getHotels);

//GET HOTEL DETAILS(Public)
router.get("/:id", getHotel);
router.get("/name/:name", getHotelByName);
router.get("/city/:city", getHotelByCity);

//HOTEL CRUD OPERATIONS(ADMIN ONLY)
router.post("/addhotel",verifyAdmin, addHotel);
router.put("/update/:id", verifyHotelOwner, updateHotel);
router.delete("/delete/:id", verifyHotelOwner, deleteHotel);

//GET HOTEL CITIES(Public)
router.get("/availableCities/c", getCities);


export default router;
