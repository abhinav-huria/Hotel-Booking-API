import User from '../models/customer_model.js';
import {compare} from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const addedUser = await newUser.save();
        res.status(201).json(addedUser);
    } catch (error) {
        // next(error);
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
                message: "Invalid Credentials em"
            });
        }
        const match = await compare(req.body.password, user.userPassword);
        if (!match) {
            return res.status(401).json({"message": "Invalid Credentials pw"});
        }
        const token = jwt.sign({id: user._id,isAdmin:user.isAdmin,isHotelOwner:user.isHotelOwner}, process.env.JWT_SECRET);
       // const {userPassword,userPhoneNumber,userEmail,userBookings,...other} = user._doc;
        res.cookie('token', token, { httpOnly: false }).status(200).send(user._id);
    } catch (error) {
        res.status(500).json(error);
    }
};