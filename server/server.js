//DEPENDENCIES
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
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

const __dirname = path.resolve(path.dirname(''));
// console.log(__dirname+"_");
//MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsProperties));
//  app.use(cors());

//DB CONNECTION
connectDB();

//GET ROUTES

app.use(express.static(path.join(__dirname, "build")));

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

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "build", "index.html"))
);

//SERVER START
app.listen(PORT, () => {
  connectDB();
  console.log(`Listening at http://localhost:${PORT}`);
});
