import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';
import dotenv from 'dotenv';

dotenv.config();


const app = express();

app.use(cors({
    credentials:true
}))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

//middlewares
app.use('/', router());


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};



server.listen(8080,() => {
    console.log('Server is listening on http://localhost:8080/');

    connectDB();
})
