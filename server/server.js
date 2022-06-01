//DEPENDENCIES
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

//ROUTES
import auth from "./routes/auth.js";
import hotels from "./routes/hotels.js";
import rooms from "./routes/rooms.js";
import booking from "./routes/booking.js";
import users from "./routes/users.js";

//UTILITIES
import "./utilities/redis.js";
import connectDB from "./utilities/dbConnection.js";

//APP
const app = express();
dotenv.config();
var corsProperties = {
  credentials: true,
  origin: ["http://localhost:3000"],
};

//MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsProperties));
//  app.use(cors());

//DB CONNECTION
connectDB();
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB Connected");
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };

//GET ROUTES
app.get("/", (req, res) => {
  res.send("Hello there");
});

//LOGIN ROUTE/MIDDLEWARE
app.use("/api/v1/auth", auth);

//HOTELS ROUTE/MIDDLEWARE
app.use("/api/v1/hotels", hotels);

//ROOMS ROUTE/MIDDLEWARE
app.use("/api/v1/rooms", rooms);

//BOOKING ROUTE/MIDDLEWARE
app.use("/api/v1/booking", booking);

//USERS ROUTE/MIDDLEWARE
app.use("/api/v1/users", users);

//SERVER START
app.listen(3003, () => {
  connectDB();
  console.log(`Listening at http://localhost:3003`);
});
