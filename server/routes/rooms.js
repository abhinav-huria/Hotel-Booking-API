import express from 'express';

import { addRoom, getRoomsByHotel,getRoom, updateRoom, deleteRoom,roomAvailability,getAllRooms } from '../controllers/room.js';
import {verifyHotelOwner, verifyUser} from '../utilities/verifyToken.js';
const router = express.Router();

router.post('/addRoom/:hotelId',verifyHotelOwner, addRoom);
router.get('/getRooms/:hotelId', getRoomsByHotel);
router.get('/getRoom/:id', getRoom);
router.get('/',getAllRooms)
router.put('/updateRoom/:id', verifyHotelOwner, updateRoom);
router.delete('/deleteRoom/:hotelId/:roomId',verifyHotelOwner, deleteRoom);
router.put('/roomAvailability/:id',verifyUser, roomAvailability);

export default router;