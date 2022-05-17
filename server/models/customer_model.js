import mongoose from 'mongoose';
//import bcrypt from 'bcrypt';
import { hash, genSalt } from 'bcrypt';
import { checkLength } from '../controllers/validation.js';

const userSchema = new mongoose.Schema(
    {
        userName:{
            type: String,
            required: true,
            unique: false
        },
        userEmail:{
            type: String,
            required: true,
            unique: true
        },
        userPassword:{
            type: String,
            required: true
        },
        userPhoneNumber:{
            type: String,
            required: true,
            unique: true,
            validate: checkLength(10)
        },
        isAdmin:{
            type: Boolean,
            default: false
        },
        isHotelOwner:{
            type: Boolean,
            default: false
        },
userBookings:{
            type: [String]
},
    },
    { timestamps: true }
)


userSchema.pre('save', async function (next){
    try{
        const salt = await genSalt(10)
        const hashedPassword = await hash(this.userPassword, salt)
        this.userPassword = hashedPassword
        next()
    }catch(error){
        next(error)
    }
})

export default mongoose.model("User", userSchema);