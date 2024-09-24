require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import apiAdminRoute from "./routes/apiAdmin";
import apiUserRoute from "./routes/apiUser";
import connectDB from './config/connectDB';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
// parse application/json
app.use(bodyParser.json({ limit: "50mb" }));

// config
app.use(cookieParser());

// routes
apiAdminRoute(app);
apiUserRoute(app)

app.post('/auth/google', async (req, res) => {
  const { code } = req.body;

  try {
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', null, {
      params: {
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: 'http://localhost:5173',
        grant_type: 'authorization_code',
      },
    });
    res.json(tokenResponse.data);
  } catch (error) {
    if (error.response) {
      console.error('Error Response:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      res.status(error.response.status).send('Error exchanging code for token');
    } else {
      console.error('Error Message:', error.message);
      res.status(500).send('Error exchanging code for token');
    }
  }
});

// connect
connectDB();

app.listen(PORT, () => {
  console.log(">>> JWT Backend is running on the port = " + PORT);
});
