//DEPENDENCIES
import express from "express";

//CONTROLLER(S)
import {signUp, signIn} from "../controllers/auth.js";

//ROUTER
const router = express.Router();

//ROUTES
router.post("/signup", signUp);
router.post("/signin", signIn);

//EXPORT
export default router; 