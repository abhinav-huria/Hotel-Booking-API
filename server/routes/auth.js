//DEPENDENCIES
import express from "express";

//CONTROLLER(S)
import { signUp, signIn } from "../controllers/auth.js";

//ROUTER
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *    SignUp:
 *      type: object
 *      required:
 *        - userEmail
 *        - userPassword
 *        - userPhoneNumber
 *        - userName
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
 */

/**
 @swagger
 * components:
 *   schemas:
 *    SignIn:
 *      type: object
 *      required:
 *       - email
 *       - password
 *      properties:
 *       email:
 *        type: string
 *        description: Email of the user
 *       password:
 *        type: string
 *        description: Password of the user
 *      example:
 *        email: help.otelbooking@gmail.com
 *        password: admin
 *    
 */

 /**
  * @swagger
  * tags:
  *   name: Auth
  *   description: The auth managing API
  */

//ROUTES

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: New user signup
 *     description: This route is used to create a new user account. The user can be either a customer or an admin/hotel owner. <b>Please enter a VALID email address as an email will be sent to it.</b><br>
 *                  <br> The request body must contain the following fields- userEmail, userPassword, userPhoneNumber & userName. Additionally the user can be an admin or a hotel owner. If the user is an admin, the request body must contain the <b>isAdmin</b> field(set as true). If the user is a hotel owner, the request body must contain the isHotelOwner field(set as true).
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUp'
 *     responses:
 *       201:
 *        description: The user has been created
 *        content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignUp'
 *       500:
 *        description: Internal server error
 *       
 * 
 *
 */
router.post("/signup", signUp);

/**
 * @swagger
 * /api/v1/auth/signin:
 *   post:
 *     summary: Sign in
 *     description: This route is used to sign in a user. The request body must contain the following fields- email & password. If the email and password validate successfully, the route will return a JWT token (as cookie) which can be used to authenticate the user. 
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignIn'
 *     responses:
 *       200:
 *        description: The user has been signed in
 *       401:
 *        description: Invalid credentials
 *       500:
 *        description: Internal server error
 * 
*/

router.post("/signin", signIn);

//EXPORT
export default router;
