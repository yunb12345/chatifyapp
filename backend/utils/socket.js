import {Server} from 'socket.io';
import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import { socketAuthMiddleware } from '../middlewares/socket.auth.middleware.js';

dotenv.config();
const app = express();
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin: process.env.CLIENT_URL,
        credentials:true,
    },
});

io.use(socketAuthMiddleware);

//funcion para saber si el usuario esta online
export function getReceiverSocketId(userId){
    console.log(userSocketMap);
    return userSocketMap[userId];
}

//esto es para almacenar los usuarios online
const userSocketMap = {}; // {userId: socketId}

io.on('connection', (socket) => {
    console.log("Usuario conectado",socket.user.fullName);

    const userId = socket.userId;
    userSocketMap[userId] = socket.id;
    
    //io.emit es usado para enviar a todos los clientes conectados
    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("Usuario desconectado",socket.user.fullName);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    });
});

export {io,app,server}