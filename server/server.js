//DEPENDENCIES
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

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


const __dirname = path.resolve(path.dirname(''));

//MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
 app.use(cors());
const PORT = process.env.PORT || 5000;
//DB CONNECTION
connectDB();

const options = {
  definition : {
    openapi: "3.0.0",
  info: {
    title: "Hotel Booking API",
    version: "1.0.0",
    description: "API for Hotel Booking Application. This API is used to book hotels, view hotel details, view rooms available, view booking history of a user and User/Hotel/Room/Booking CRUD operations. Developed by: Abhinav Huria",
  },
  servers: [
    {
      url:"https://otelapp.herokuapp.com",
      description: "Heroku Server"
    },
    {
      url: "http://localhost:5000",
      description: "Local Server"
    }
   
  ],
  // components: {
  //   securitySchemes: {
  //     bearerAuth: {
  //       type: "http",
  //       scheme: "bearer",
  //       bearerFormat: "JWT",
  //     },
  //   },
  // },
  // security: [
  //   {
  //     bearerAuth: [],
  //   },
  // ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJSDoc(options);


//GET ROUTES

app.use(express.static(path.join(__dirname, "build")));

app.use("/v1/api-docs", swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  swaggerOptions: {
    docExpansion: "list",
    filter: true,
    showRequestDuration: true,
    showExtensions: true,
    defaultModelRendering: "schema"
  },
} ));

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
