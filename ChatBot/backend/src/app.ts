import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
config();
const app = express();
console.log("start");
//the url on the port 3000 would be / heelo then the request by the client, response of 
// the client and the next to move on to the next available middlewares
//Next is used to move on to next middleware
//Middleware are the functions which handle the request 
//middlewares
app.use(cors({origin: "http://localhost:5173",credentials: true}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
//will be used only in production mode and not in dev
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;