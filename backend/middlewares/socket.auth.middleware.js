import jwt from "jsonwebtoken";
import User from "../db/models/User.js";
import dotenv from "dotenv";

dotenv.config();
export const socketAuthMiddleware = async (socket, next) => {
    try {
        const token = socket.handshake.headers.cookie
            ?.split('; ')
            .find(row => row.startsWith('jwt='))
            ?.split('=')[1];
        if (!token) {
            console.log("Socket connectgion rejected: No token provided");
            return next(new Error('Authentication error: No token provided'));
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if (!decoded) {
            console.log("Socket connection rejected: Invalid token");
            return next(new Error('Authentication error: Invalid token'));
        }
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            console.log("Socket connection rejected: User not found");
            return next(new Error('Authentication error: User not found'));
        }

        socket.user = user;
        socket.userId = user._id.toString();
        next();
    }catch (e){
        console.error("Socket authentication error:", e);
        return next(new Error('Authentication error: Internal server error'));
    }
};