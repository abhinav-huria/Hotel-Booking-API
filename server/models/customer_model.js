//DEPENDENCIES
import mongoose from "mongoose";
import { hash, genSalt } from "bcrypt";

//VALIDATOR
import { checkLength } from "../controllers/validation.js";
import { generateUserId } from "../utilities/generateID.js";

//SCHEMA
const userSchema = new mongoose.Schema(
  {
    _id:  { type: String },
    userName: {
      type: String,
      required: true,
      unique: false,
    },
    userEmail: {
      type: String,
      required: true,
      unique: true,
    },
    userPassword: {
      type: String,
      required: true,
    },
    userPhoneNumber: {
      type: String,
      required: true,
      unique: true,
      validate: checkLength(10),
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isHotelOwner: {
      type: Boolean,
      default: false,
    },
    userBookings: {
      type: [String],
    },
  },
  { timestamps: true }
);

//PASSWORD HASHING
userSchema.pre("save", async function (next) {
  try {
    const salt = await genSalt(10);
    const hashedPassword = await hash(this.userPassword, salt);
    this.userPassword = hashedPassword;
    this._id = generateUserId();
    next();
  } catch (error) {
    next(error);
  }
});



//MODEL EXPORT
export default mongoose.model("User", userSchema);
