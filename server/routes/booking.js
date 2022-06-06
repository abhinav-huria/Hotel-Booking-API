//DEPENDENCIES
import express from "express";

//CONTROLLER(S)
import { getBooking,getBookings,bookRoom, deleteBooking ,getUserBookings} from "../controllers/booking.js";

//VERIFICATION
import { verifyAdmin,verifyUser } from "../utilities/verifyToken.js";

//ROUTER
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *    Booking:
 *      type: object
 *      required:
 *       - endAt
 *       - startAt
 *       - totalPrice
 *       - guests
 *       - roomId
 *       - hotelId
 *       - userId
 *      properties:
 *        _id:
 *         type: string
 *         description: Unique ID of the booking(auto generated)
 *        endAt:
 *         type: Date
 *         description:  End date of the booking
 *        startAt:
 *         type: Date
 *         description: Start date of the booking
 *        totalPrice:
 *         type: number
 *         description: Total price of the booking
 *        guests:
 *         type: number
 *         description: Number of guests in the booking
 *        roomId:
 *         type: string
 *         description: Unique ID of the room booked
 *        hotelId:
 *         type: string
 *         description: Unique ID of the hotel booked
 *        userId:
 *         type: string
 *         description: Unique ID of the user booked
 *      example:
 *        startAt: "2022-07-01T00:00:00.000Z"
 *        endAt: "2022-07-05T00:00:00.000Z"
 *        totalPrice: 1000
 *        guests: 2
 *        roomId: R948678
 *        hotelId: H525988
 *        userId: U421191
 */

 /**
  * @swagger
  * tags:
  *   name: Booking
  *   description: Booking management routes
  */


/**
 * @swagger
 * /api/v1/booking/{userId}/{bookingId}:
 *   get:
 *     summary: Get a booking by ID
 *     description: This route gets a booking by ID and returns it. It is only accessible by logged in users. A user can only get their own bookings and admins can get all bookings.
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user
 *         example: U421191
 *       - in: path
 *         name: bookingId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the booking 
 *         example: B654887
 *     responses:
 *       200:
 *         description: Successfully retrieved booking
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized or signed out
 *       404:
 *         description: The booking was not found
 *       500:
 *         description: Internal server error
 *    
 */

//GET BOOKING DETAILS(USER ONLY)
router.get("/:userID/:bookingId",verifyUser, getBooking);

/**
 * @swagger
 * /api/v1/booking/allBookings:
 *   get:
 *     summary: Get all bookings
 *     description: This route is used to get all bookings in the database. It can be accessed by admin only which is verified using the token.
 *     tags: [Booking]
 *     responses:
 *       200:
 *         description: Successfully retrieved bookings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized or signed out
 *       404:
 *         description: No bookings were found
 *       500:
 *         description: Internal server error
 *    
 */

//GET ALL BOOKINGS(ADMIN ONLY)
router.get("/allBookings",verifyAdmin, getBookings);


/**
 * @swagger
 * /api/v1/booking/mybookings/u/{userId}:
 *   get:
 *     summary: Get all bookings of a user
 *     description: This route is used to get all bookings of a user. Logged in users can only get their own bookings (verified using JWT). Admins have access to all bookings.
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user
 *         example: U421191
 *     responses:
 *       200:
 *         description: Successfully retrieved bookings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized or signed out
 *       404:
 *         description: No bookings were found
 *       500:
 *         description: Internal server error
 *    
 */

//GET USER BOOKINGS
router.get("/mybookings/u/:userId",verifyUser, getUserBookings);


/**
 * @swagger
 * /api/v1/booking/book/{userId}/{roomId}:
 *   post:
 *     summary: Book a room
 *     description: This route is used to book a room. It is only accessible by logged in users. A user can only book a room if it is available. If a room is already booked, the user will be notified.
 *                  <br> The request body must contain the following fields- startAt, endAt, guests, totalPrice, hotelId, roomId, userId. <br> The startAt and endAt fields should be in date format. <br> If the data validates, the room will be booked, the dates will be added to the respective room and the user will be notified (also via email).
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the hotel
 *         example: H525988
 *       - in: path
 *         name: roomId
 *         schema:
 *           type: string
 *           required: true
 *           description: The id of the room
 *           example: R948678
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: Successfully booked room
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized or signed out
 *       404:
 *         description: Something is missing or the room is unavailable
 *       500:
 *         description: Internal server error
 *    
 */

//BOOK ROOM(USER ONLY)
router.post("/book/:userId/:roomId",verifyUser, bookRoom);


/**
 * @swagger
 * /api/v1/booking/delete/{bookingId}:
 *   delete:
 *     summary: Delete a booking
 *     description: Delete a booking by ID. It is only accessible by logged in users. A user can only delete their own bookings and admins can delete all bookings. 
 *                  <br> Please note that this only deletes the booking from the database. The room is not deleted and the dates are not freed.
 *     tags: [Booking]
 *     parameters:
 *        - in: path
 *          name: bookingId
 *          schema:
 *            type: string
 *          required: true
 *          description: the id of the booking
 *          example: B654887
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


//DELETE BOOKING(USER ONLY)
router.delete("/delete/:bookingId",verifyUser, deleteBooking);




//EXPORT
export default router;