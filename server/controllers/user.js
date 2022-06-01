import User from "../models/customer_model.js";
import Dispute from "../models/dispute_model.js";
export const updateUser = async (req,res,next)=>{
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
}
export const deleteUser = async (req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
}
export const getUser = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.userId);
    const{ userPassword,userPhoneNumber, ...other}=user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
}
export const getUsers = async (req,res,next)=>{
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const submitDispute = async (req,res,next)=>{
  try{
    const newDispute = new Dispute(req.body);
    const addedDispute = await newDispute.save();
    res.status(201).json(addedDispute);
  }catch(err){
    res.status(500).json(err);
  }

  }