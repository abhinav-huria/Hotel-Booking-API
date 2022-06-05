//DEPENDENCIES
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

//MODEL IMPORT(S)
import User from "../models/customer_model.js";

//CONTROLLER FUNCTION(S)
export const signUp = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const addedUser = await newUser.save();
    res.status(201).json(addedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const signIn = async (req, res) => {
  try {
    const user = await User.findOne({
      userEmail: req.body.email,
    });
    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }
    const match = await compare(req.body.password, user.userPassword);
    if (!match) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin, isHotelOwner: user.isHotelOwner },
      process.env.JWT_SECRET
    );
    res.cookie("token", token).status(200).json({ user: user._id });
  } catch (error) {
    res.status(500).json(error);
  }
};
