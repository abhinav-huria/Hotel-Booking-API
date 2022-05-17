import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import auth from "./routes/auth.js";
import hotels from "./routes/hotels.js";
import rooms from "./routes/rooms.js";
import cookieParser from "cookie-parser";
//import path from "path";
// import { Customer } from "./models/customer_model";
// import { Reservation } from "./models/reservation_model";
// import { Hotels } from "./models/hotel_model";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
dotenv.config();
//DB CONNECTION
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB Connected");
    }
    catch (err) {
        console.log(err);
       throw err;
    }
}

// mongoose.connect(process.env.MONGO_URL, 
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }
// ).then(console.log(`MONGODB CONNECTED`));

app.get("/", (req,res) => {
    res.send("Hello there");
})

app.use("/api/v1/auth",auth);
app.use("/api/v1/hotels",hotels);
app.use("/api/v1/rooms",rooms);

app.listen(3003, () => {
    connectDB();
    console.log(`Listening at http://localhost:3003`);
})


