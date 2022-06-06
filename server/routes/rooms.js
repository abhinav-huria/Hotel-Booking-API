//DEPENDENCIES
import express from "express";

//CONTROLLER(S)
import {
  addRoom,
  getRoomsByHotel,
  getRoom,
  updateRoom,
  deleteRoom,
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


/**
 * @swagger
 * components:
 *   schemas:
 *    Room:
 *      type: object
 *      required:
 *       - name
 *       - description
 *       - pricePerNight
 *       - guestCapacity
 *       - bedType
 *       - hotelId
 *       - numberOfRooms
 *      properties:
 *        _id:
 *         type: string
 *         description: Unique ID of the room(auto generated)
 *        name:
 *         type: string
 *         description:  Name of the room
 *        description:
 *         type: string
 *         description: Description of the room
 *        amenities:
 *         type: array
 *         description: Amenities of the room
 *        pricePerNight:
 *         type: number
 *         description: Price per night of the room
 *        guestCapacity:
 *         type: number
 *         description: Guest capacity of the room
 *        bedType:
 *         type: string
 *         description: Bed type of the room
 *        hotelId:
 *         type: string
 *         description: ID of the hotel the room belongs to
 *        roomsAvailable:
 *         type: array
 *         description: Instances of the room that are booked for certain dates
 *      example:
 *        name: Room 1
 *        description: This is a room
 *        amenities: ["wifi", "tv"]
 *        pricePerNight: 1000
 *        guestCapacity: 2
 *        bedType: King
 *        numberOfRooms: 1
 *        hotelId: H577602
 *        
 *        
 */

 /**
  * @swagger
  * tags:
  *   name: Rooms
  *   description: Room management routes
  */

//GET ALL ROOMS(ADMIN ONLY)

/**
 * @swagger
 * /api/v1/rooms:
 *   get:
 *     summary: Get all rooms
 *     description: This route returns all rooms in the database. It can only be accessed by <b>admin</b>.
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: Successfully retrieved rooms
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       401:
 *         description: Unauthorized or signed out
 *       404:
 *         description: No rooms were found
 *       500:
 *         description: Internal server error
 *    
 */

 router.get("/", verifyAdmin, getAllRooms);

//GET ROOM DETAILS(PUBLIC)
/**
 * @swagger
 * /api/v1/rooms/getRoom/{id}:
 *   get:
 *     summary: Get a room by id
 *     description: This route returns a room by id. It is publicly accessible.
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the room
 *         example: R441480
 *     responses:
 *       200:
 *         description: Successfully retrieved room
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: The room was not found
 *       500:
 *         description: Internal server error
 *    
 */
 router.get("/getRoom/:id", getRoom);

//GET HOTEL ROOMS(PUBLIC)
/**
 * @swagger
 * /api/v1/rooms/getRooms/{hotelId}?start={start}&end={end}:
 *   get:
 *     summary: Get all rooms of a hotel
 *     description: This route returns all available (i.e. not booked on the entered dates) rooms of a hotel. It is publicly accessible. <b>Please leave the dates empty to get all rooms</b>.
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the hotel
 *         example: H525988
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *           format: yyyy-mm-dd
 *           description: The start date of the booking
 *           example: 2022-07-01
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *           format: yyyy-mm-dd
 *           description: The end date of the booking
 *           example: 2022-07-05
 *     responses:
 *       200:
 *         description: Successfully retrieved rooms
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: The rooms were not found
 *       500:
 *         description: Internal server error
 *    
 */
 router.get("/getRooms/:hotelId", getRoomsByHotel);


//ADD ROOM(HOTEL OWNER/ADMIN ONLY)
/**
 * @swagger
 * /api/v1/rooms/hotel/addRoom:
 *  post:
 *     summary: Add a room to a hotel
 *     description: This route adds a room to a hotel. It can only be accessed by <b>admin</b>.
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       201:
 *        description: The room has been created
 *        content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       401:
 *        description: Unauthorized or signed out
 *       500:
 *        description: Internal server error
 */

router.post("/hotel/addRoom", verifyHotelOwner, addRoom);


//UPDATE/DELETE ROOM(ADMIN ONLY)
/**
 * @swagger
 * /api/v1/rooms/updateRoom/{id}:
 *   put:
 *    summary: Update a room
 *    description: This route updates a room. It can only be accessed by <b>admin</b>.
 *    tags: [Rooms]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *        required: true
 *        description: The id of the room
 *        example: R4948678
 *    requestBody:
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/Room'
 *    responses:
 *      200:
 *        description: Successfully updated room
 *        content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Room'
 *      401:
 *        description: Unauthorized or signed out
 *      404:
 *        description: The room was not found
 *      500:
 *        description: Internal server error
 * 
 */


router.put("/updateRoom/:id", verifyHotelOwner, updateRoom);

/**
 * @swagger
 * /api/v1/rooms/deleteRoom/{roomId}:
 *   delete:
 *     summary: Delete a room
 *     description: This route deletes a room. It can only be accessed by <b>admin</b>. This does not delete any bookings.
 *     tags: [Rooms]
 *     parameters:
 *        - in: path
 *          name: roomId
 *          schema:
 *            type: string
 *          required: true
 *          description: the id of the room
 *          example: R948678
 *     responses:
 *       200:
 *        description: Successfully deleted hotel
 *       401:
 *         description: Unauthorized or signed out
 *       404:
 *        description: Something is missing
 *       500:
 *        description: Internal server error
 */


router.delete("/deleteRoom/:roomId", verifyAdmin, deleteRoom);


export default router;
