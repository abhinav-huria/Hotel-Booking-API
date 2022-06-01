//DEPENDENCIES
import express from "express";

//CONTROLLER(S)
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  submitDispute
} from "../controllers/user.js";

//VERIFICATION
import { verifyAdmin, verifyUser } from "../utilities/verifyToken.js";

//ROUTER
const router = express.Router();

//UPDATE(USER ONLY)
router.put("/:userId", verifyUser, updateUser);

//DELETE USER(ADMIN ONLY)
router.delete("/:userId", verifyAdmin, deleteUser);

//GET USER(USER ONLY)
router.get("/:userId", verifyUser, getUser);

//GET ALL USERS(ADMIN ONLY)
router.get("/all/c", verifyAdmin, getUsers);

//POST DISPUTE
router.post("/dispute/:userId", verifyUser, submitDispute);

//EXPORT
export default router;
