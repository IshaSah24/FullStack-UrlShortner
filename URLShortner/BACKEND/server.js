import express from 'express';
import dotenv from 'dotenv';
import connectDb from './src/config/mongo.config.js';
import short_url from './src/routes/short_url.route.js';
import authRoutes from './src/routes/auth.route.js';
import {redirectShortUrl } from './src/controller/short_url.controller.js';
import { globalErrorHandler } from './src/middlewares/error.middleware.js';
import cookieParser from "cookie-parser";

import cors  from 'cors';

dotenv.config(); // Load .env
const app = express();

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true    
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* Create a short URL
----------------------*/
app.use("/api",short_url);

/* Authentication routes
----------------------*/
app.use("/api/auth", authRoutes);

/* redirecting from  the short url 
-----------------------------------*/
app.get("/:id", redirectShortUrl)


app.use(globalErrorHandler);
app.listen(5000, () => {
    connectDb();
    console.log("Server running on http://localhost:5000");
});
