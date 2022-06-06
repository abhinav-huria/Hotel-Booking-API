//DEPENDENCIES
import mongoose from "mongoose";

import { generateDisputeId } from "../utilities/generateID.js";

const DisputeSchema = new mongoose.Schema({
    _id: { type: String },
    userId: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    solved:{
        type: Boolean,
        required: false,
        default: false
    }
});

DisputeSchema.pre("save", function (next) {
    try{
   this._id = generateDisputeId();
    next();
    }catch(error){
        next(error);
    }
});

export default mongoose.model("Dispute", DisputeSchema);