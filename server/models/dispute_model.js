//DEPENDENCIES
import mongoose from "mongoose";

const DisputeSchema = new mongoose.Schema({
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
    }
});


export default mongoose.model("Dispute", DisputeSchema);