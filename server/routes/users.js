//DEPENDENCIES
import express from "express";

//CONTROLLER(S)
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  submitDispute,
  getDisputes,
  markDisputeSolved
} from "../controllers/user.js";

//VERIFICATION
import { verifyAdmin, verifyUser } from "../utilities/verifyToken.js";

//ROUTER
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *    User:
 *      type: object
 *      required:
 *        - userName
 *        - userEmail
 *        - userPassword
 *        - userPhoneNumber
 *      properties:
 *        _id:
 *         type: string
 *         description: Unique ID of the user(auto generated)
 *        userEmail:
 *         type: string
 *         description: Email of the user
 *        userPassword:
 *         type: string
 *         description: Password of the user
 *        userPhoneNumber:
 *         type: string
 *         description: Phone number of the user
 *        userName:
 *         type: string
 *         description: Name of the user 
 *        isAdmin:
 *         type: boolean
 *         description: Is the user an admin
 *        isHotelOwner:
 *         type: boolean
 *         description: Is the user a hotel owner
 *        userBookings:
 *         type: array
 *         description: Bookings of the user
 *      example:
 *        userName: admin
 *        userEmail: help.otelbooking@gmail.com
 *        userPassword: admin  
 *        userPhoneNumber: 4564564564
 *        isAdmin: true
 *        isHotelOwner: true
 *        userBookings: []
 *    Dispute:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - subject
 *        - message
 *      properties:
 *        _id:
 *         type: string
 *         description: Unique ID of the dispute(auto generated)
 *        userId:
 *         type: string
 *         description: ID of the user who submitted the dispute
 *        name:
 *         type: string
 *         description: Name of the user who submitted the dispute
 *        email:
 *         type: string
 *         description: Email of the user
 *        subject:
 *         type: string
 *         description: Subject of the dispute
 *        message:
 *         type: string
 *         description: Message of the dispute
 *        solved:
 *         type: boolean
 *         default: false
 *         description: Is the dispute solved    
 */


 /**
  * @swagger
  * tags:
  *   name: Users
  *   description: The user managing API
  */

//GET ALL USERS(ADMIN ONLY)
/**
 * @swagger
 * /api/v1/users/all/c:
 *   get:
 *     summary: Get all users
 *     description: This route gets all users in the database. It is only accessible by <b>admin</b>.
 *     tags: [Users]
 *     responses:
 *       200:
 *        description: Successfully retrieved all users
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/User'
 *       404:
 *        description: No users were found
 *       500:
 *        description: Internal server error
 * 
 */ 
router.get("/all/c", verifyAdmin, getUsers);

//GET USER DETAILS
/**
 * @swagger
 * /api/v1/users/{userId}:
 *   get:
 *     summary: Get a user 
 *     description: This route returns a user by id. It is accessible by <b>admin</b> and <b>user</b>.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: the id of the user
 *         example: U165822
 *     responses:
 *       200:
 *         description: Successfully retrieved user
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Please login to continue
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Internal server error
 *    
 */
router.get("/:userId", verifyUser, getUser);


/**
 * @swagger
 * /api/v1/users/update/{userId}:
 *   put:
 *    summary: Update a user
 *    description: This route updates a user by id. It is accessible by <b>admin</b> and <b>user</b>. Refer to the schema for the user object for more details.
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *         type: string
 *        required: true
 *        description: the id of the user
 *        example: U421191
 *    requestBody:
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: Successfully updated user
 *        content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Internal server error
 * 
 */
router.put("/update/:userId", verifyUser, updateUser);

/**
 * @swagger
 * /api/v1/users/{userId}:
 *   delete:
 *     summary: Delete a user
 *     description: This route deletes a user by id. It is accessible by <b>admin</b> only.
 *     tags: [Users]
 *     parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *            type: string
 *          required: true
 *          description: The id of the user
 *          example: U421191
 *     responses:
 *       200:
 *        description: Successfully deleted user
 *       404:
 *        description: The user was not found
 *       500:
 *        description: Internal server error
 */

//DELETE USER(ADMIN ONLY)
router.delete("/:userId", verifyAdmin, deleteUser);

 /**
  * @swagger
  * tags:
  *   name: Disputes
  *   description: The dispute managing API
  */

//SUBMIT DISPUTE
/**
 * @swagger
 * /api/v1/users/dispute/{userId}:
 *  post:
 *     summary: Submit a dispute
 *     description: This route submits a dispute. It is accessible by logged in users.
 *     tags: [Disputes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dispute'
 *     responses:
 *       201:
 *        description: The dispute has been created
 *        content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dispute'
 *       500:
 *        description: Internal server error
 */
router.post("/dispute/:userId", verifyUser, submitDispute);

//GET DISPUTES
/**
 * @swagger
 * /api/v1/users/disputes/all:
 *   get:
 *     summary: Get all disputes
 *     description: This route gets all disputes in the database. It is accessible by <b>admin</b>.
 *     tags: [Disputes]
 *     responses:
 *       200:
 *        description: Successfully retrieved all disputes
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Dispute'
 *       404:
 *        description: No disputes were found
 *       500:
 *        description: Internal server error
 * 
 */ 
router.get("/disputes/all", verifyAdmin, getDisputes);

//MARK DISPUTE AS SOLVED
/**
 * @swagger
 * /api/v1/users/disputes/solve/{disputeId}:
 *   get:
 *     summary: Mark a dispute as solved
 *     description: This route marks a dispute as solved. It is accessible by <b>admin</b>.
 *     tags: [Disputes]
 *     parameters:
 *       - in: path
 *         name: disputeId
 *         schema:
 *           type: string
 *         required: true
 *         description: the id of the dispute
 *         example: D1***
 *     responses:
 *       200:
 *         description: Successfully marked dispute as solved
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dispute'
 *       401:
 *         description: Please login to continue
 *       404:
 *         description: The dispute was not found
 *       500:
 *         description: Internal server error
 *    
 */
router.get("/disputes/solve/:disputeId", verifyAdmin, markDisputeSolved);

//EXPORT
export default router;
