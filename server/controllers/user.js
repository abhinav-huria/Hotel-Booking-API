import User from "../models/customer_model.js";
import Dispute from "../models/dispute_model.js";
import { sendDisputeSubmission } from "../utilities/mail.js";

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    console.log(updatedUser);
    console.log(req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json("User not found.");
    const { userPassword, userPhoneNumber, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json("No users found.");
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const submitDispute = async (req, res, next) => {
  try {
    const newDispute = new Dispute(req.body);
    const addedDispute = await newDispute.save();
    sendDisputeSubmission(addedDispute);
    res.status(201).json(addedDispute);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getDisputes = async (req, res, next) => {
  try {
    const disputes = await Dispute.find();
    if (disputes.length === 0) {
      return res.status(404).json("No disputes found.");
    }
    res.status(200).json(disputes);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const markDisputeSolved = async (req, res, next) => {
  try {
    const updatedDispute = await Dispute.findByIdAndUpdate(
      req.params.disputeId,
      { $set: { solved: true } },
      { new: true }
    );
    if (!updatedDispute) {
      return res.status(404).json("Dispute not found.");
    }
    res.status(200).json(updatedDispute);
  } catch (err) {
    res.status(500).json(err);
  }
};
