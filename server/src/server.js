require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import adminApiRoute from "./routes/adminApi";
import userApiRoute from "./routes/userApi";
import sharedApiRoute from './routes/sharedApi'
import connectDB from './config/connectDB';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT

app.use(cors({
  origin: process.env.REACT_URL,
  credentials: true,
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
// parse application/json
app.use(bodyParser.json({ limit: "50mb" }));

// config
app.use(cookieParser());

// routes
adminApiRoute(app);
userApiRoute(app)
sharedApiRoute(app)

// connect
connectDB();

app.listen(PORT, () => {
  console.log(">>> JWT Backend is running on the port = " + PORT);
});
