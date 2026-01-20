import jwt from "jsonwebtoken";
import User from "../db/models/User.js";
import dotenv from "dotenv";

dotenv.config();
export const protectRoute = async (req,res,next) =>{
    try{
        const token = req.cookies.jwt
        if(!token) return res.status(401).json({message:"Unauthorized - No token provided"});
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded) return res.status(401).json({message:"Unauthorized - No token provided"});
        const user = await User.findById(decoded.userId).select("-password"); //selecciona todo menos la contraseña
        // Asegurar que phone esté presente
        if (!user.phone) {
            user.phone = "";
        }
        if(!user) return res.status(404).json({meesage:"Usuario no encontrado"});
        req.user = user;
        next();
    }
    catch(error){
        console.log("Error en protectRoute middleware",error);
        res.status(500).json({message:"Internal server error"});
    }
}