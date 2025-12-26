import jwt from "jsonwebtoken";

export const generateToken = (userId,res) => {
    const token = jwt.sign({userId:userId},process.env.JWT_SECRET,{expiresIn:"7d"});
    res.cookie("jwt",token,{
        maxAge: 7*24*60*60*1000, // esta en milisegundos
        httpOnly: true, //esto es para prevenir XSS
        sameSite: "strict", //previene CSRF
        secure: process.env.NODE_ENV === "development" ? false:true, //si no es development el campo es falso
    });
    return token;
}