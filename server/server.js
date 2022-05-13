import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { Customer } from "./models/customer_model";
import { Reservation } from "./models/reservation_model";
import { Hotels } from "./models/hotel_model";

const app = express();

//DB CONNECTION
mongoose.connect(process.env.MONGO_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(console.log(`MONGODB CONNECTED`));

app.get("/", (req,res) => {
    res.json("🎂")
})

app.listen(3003, () => {
    console.log(`Listening at http://localhost:3003}`);
})


module.exports = server;