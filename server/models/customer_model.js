import { Schema, model } from "mongoose"
import { genSalt, hash } from "bcrypt"

const customerSchema = new Schema(
    {
        customerName:{
            type: String,
            required: true,
            unique: false
        },
        customerEmail:{
            type: String,
            required: true,
            unique: true
        },
        customerPassword:{
            type: String,
            required: true
        },
        customerAddress:{
            type: String,
            min:8
        },
        customerPhoneNumber:{
            type: String,
            min:10,
            max: 10,
            required: true,
            unique: true
        },
        customerBookings:[{
            type: Schema.Types.ObjectId,
            ref: 'Reservation'
        }],
        customerReviews:[{
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }]
       
    },
    { timestamps: true }
)


customerSchema.pre('save', async function (next){
    try{
        const salt = await genSalt(10)
        const hashedPassword = await hash(this.customerPassword, salt)
        this.customerPassword = hashedPassword
        next()
    }catch(error){
        next(error)
    }
})

export default model("Customer", customerSchema)