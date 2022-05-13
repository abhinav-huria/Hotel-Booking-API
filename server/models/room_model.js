import mongoose from "mongoose";


const RoomSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    images: [
        {
            image: String
        }
    ],

    pricePerNight: {
        type: Number,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    guestCapacity: {
        type: Number,
        required: true,
    },

    numOfBeds: {
        type: Number,
        required: true,
    },

    internet: {
        type: Boolean,
        default: false,
    },

    breakfast: {
        type: Boolean,
        default: false,
    },

    airConditioned: {
        type: Boolean,
        default: false,
    },

    petsAllowed: {
        type: Boolean,
        default: false
    },

    roomCleaning: {
        type: Boolean,
        default: false
    },

    ratings: {
        type: Number,
        default: 0
    },

    numOfReviews: {
        type: Number,
        default: 0
    },

    category: {
        type: String,
        required: true,
        enum: ['King', 'Single', 'Twins']
    },

    reviews: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },

}, {
    timestamps: true
});

export default model("Room", RoomSchema)
