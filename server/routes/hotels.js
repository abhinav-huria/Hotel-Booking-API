//DEPENDENCIES
import express from "express";

//CONTROLLER(S)
import {
  addHotel,
  getHotel,
  getHotels,
  updateHotel,
  deleteHotel,
  getHotelsByName,
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

/**
 * @swagger
 * components:
 *   schemas:
 *    Hotel:
 *      type: object
 *      properties:
 *        _id:
 *         type: string
 *         description: Unique ID of the hotel(auto generated)
 *        name:
 *         type: string
 *         description:  Name of the hotel
 *        city:
 *         type: string
 *         description: City of the hotel
 *        address:
 *         type: string
 *         description: Address of the hotel
 *        phoneNumber:
 *         type: string
 *         description: Phone number of the hotel
 *        email:
 *         type: string
 *         description: Email of the hotel
 *        rating:
 *         type: string
 *         description: Rating of the hotel
 *        description:
 *         type: string
 *         description: Description of the hotel
 *        amenities:
 *         type: array
 *         description: Amenities of the hotel
 *        rooms:
 *         type: array
 *         description: Rooms of the hotel
 *      example:
 *        name: Hotel1
 *        email: help.otelbooking@gmail.com
 *        phoneNumber: 4564564564 
 *        city: Pune
 *        address: Viman Nagar, Pune
 *        rating: 4
 *        description: This is a hotel
 *        amenities: ["Gym","Spa","Pool"]
 *        
 */



 /**
  * @swagger
  * tags:
  *   name: Hotels
  *   description: The hotel managing API
  */


/**
 * @swagger
 * /api/v1/hotels:
 *   get:
 *     summary: Get all hotels
 *     description: This route returns all hotels in the database. It can only be accessed by admin.
 *     tags: [Hotels]
 *     responses:
 *       200:
 *         description: Successfully retrieved hotels
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hotel'
 *       404:
 *         description: No hotels found
 *       500:
 *         description: Internal server error
 *    
 */
router.get("/", verifyAdmin, getHotels);


/**
 * @swagger
 * /api/v1/hotels/{hotelId}:
 *   get:
 *     summary: Get a hotel by ID
 *     description: This route returns a hotel by ID. It is publicly accessible. 
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the hotel
 *         example: H525988
 *     responses:
 *       200:
 *         description: Successfully retrieved hotel
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hotel'
 *       404:
 *         description: The hotel was not found
 *       500:
 *         description: Internal server error
 *    
 */
 router.get("/:id", getHotel);


/**
 * @swagger
 * /api/v1/hotels/availableCities/c:
 *   get:
 *     summary: Get all available cities
 *     description: This route returns all the cities that the hotels are available in. It is publicly accessible.
 *     tags: [Hotels]
 *     responses:
 *       200:
 *         description: Successfully retrieved cities
 *       404:
 *         description: The hotels were not found
 *       500:
 *         description: Internal server error
 *    
 */

 router.get("/availableCities/c", getCities);


/**
 * @swagger
 * /api/v1/hotels/name/{name}:
 *   get:
 *     summary: Get hotels by name
 *     description: This route returns hotels by name. It is publicly accessible.
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the hotel(s)
 *         example: Hotel1
 *     responses:
 *       200:
 *         description: Successfully retrieved hotel(s)
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hotel'
 *       404:
 *         description: No hotels were found
 *       500:
 *         description: Internal server error
 *    
 */
router.get("/name/:name", getHotelsByName);

/**
 * @swagger
 * /api/v1/hotels/city/{city}:
 *   get:
 *     summary: Get hotels by city
 *     description: This route returns hotels by city. It is publicly accessible.
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *         description: The city of the hotel(s)
 *         example: Chandigarh
 *     responses:
 *       200:
 *         description: Successfully retrieved hotel(s)
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hotel'
 *       404:
 *         description: No hotels were found
 *       500:
 *         description: Internal server error
 *    
 */
router.get("/city/:city", getHotelByCity);

/**
 * @swagger
 * /api/v1/hotels/addHotel:
 *  post:
 *     summary: Add a hotel
 *     description: This route adds a hotel to the database. It can only be accessed by admin.<br> It requires a JSON body with the following fields- name, city, address, phoneNumber, email, rating, description, amenities, rooms.
 *     tags: [Hotels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hotel'
 *     responses:
 *       201:
 *        description: The hotel has been created
 *        content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hotel'
 *       500:
 *        description: Internal server error
 */

router.post("/addhotel",verifyAdmin, addHotel);

/**
 * @swagger
 * /api/v1/hotels/update/{id}:
 *   put:
 *    summary: Update a hotel
 *    description: This route updates a hotel in the database. It takes the hotelId as a parameter. It can only be accessed by admin. 
 *    tags: [Hotels]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *        required: true
 *        description: The id of the hotel
 *        example: U421191
 *    requestBody:
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/Hotel'
 *    responses:
 *      200:
 *        description: Successfully updated hotel
 *        content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Hotel'
 *      404:
 *        description: The hotel was not found
 *      500:
 *        description: Internal server error
 * 
 */
router.put("/update/:id", verifyAdmin, updateHotel);

/**
 * @swagger
 * /api/v1/hotels/delete/{id}:
 *   delete:
 *     summary: Delete a hotel
 *     description: This route deletes a hotel from the database. It takes the hotelId as a parameter. It can only be accessed by admin.
 *     tags: [Hotels]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The id of the hotel
 *          example: H570450
 *     responses:
 *       200:
 *        description: Successfully deleted hotel
 *       404:
 *        description: The hotel was not found
 *       500:
 *        description: Internal server error
 */

router.delete("/delete/:id", verifyAdmin, deleteHotel);


export default router;
