import express from 'express';
import dotenv from 'dotenv';
import path from "path";
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoute from './routes/authRoute.js';
import messageRoute from './routes/messageRoute.js';

import {app, server} from './utils/socket.js';
import {connectDB} from './db/db.js';

dotenv.config();

const __dirname = path.resolve();
app.use(express.json({limit:'5mb'}));
const clientUrl = process.env.CLIENT_URL?.replace(/\/+$/, '') || 'http://localhost:5173';
app.use(cors({origin: clientUrl, credentials:true}));
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser())

app.use('/api/auth', authRoute);
app.use('/api/message', messageRoute);

//para deploy
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

  app.get(/^(?!\/api).*/, (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(process.env.PORT, () => {
  console.log('Server is running on port 3000');
  connectDB();
});