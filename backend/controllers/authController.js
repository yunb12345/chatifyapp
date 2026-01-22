import User from "../db/models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/jwtvalidator.js";
import { sendWelcomeEmail } from "../emails/emailHandler.js";
import dotenv from "dotenv";
import cloudinary from "../utils/cloudinary.js";

dotenv.config();

export const signup = async (req,res) =>{
    const {fullName,email,password} = req.body;
    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message:"Se necesita todos los campos"});
        }

        if(password.length < 5){
             return res.status(400).json({message:"La contraseña tiene que tener una longitud mayor a 5"});
        }
        const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
        if (!emailRegex.test(email)){
            return res.status(400).json({message:"Email no valido"});
        }
        const user = await User.findOne({email}) //{email:email}
        if(user){
            return res.status(400).json({message:"Usuario ya existe"});
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User ({
            fullName, //esto es lo mismo que fullName:fullName
            email,
            password: hashedPassword
        })
        if(newUser){
            generateToken(newUser._id,res);
            const savedUser = await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            });

            try{
                await sendWelcomeEmail(savedUser.email,savedUser.fullName,process.env.CLIENT_URL);
            }
            catch(error){
                console.error("Error al enviar el mail",error);
            }
        }else{
            res.status(400).json({message:"Dato de usuario invalido"})
        }

    }
    catch(e){
        console.log("Error en el registro controller",e)
        res.status(500).json({
            message:"Internal server error"
        });
    }
}

export const login = async (req,res) => {
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        console.log(user);
        if(!user) return res.status(400).json({message:"Credenciales invalidos"});
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect) return res.status(400).json({message:"Credenciales invalidos"});

        generateToken(user._id,res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })
    }
    catch(e){
        console.error("Error en el controller login",e);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const logout = (_,res) => {
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"Logout exitoso"});
}

export const updateProfile = async (req,res) => {
    try{
        const {fullName, profilePic} = req.body;
        const userId = req.user._id;
        const updateData = {};

        if(fullName){
            updateData.fullName = fullName;
        }

        if(profilePic){
            const uploadResponse = await cloudinary.uploader.upload(profilePic);
            updateData.profilePic = uploadResponse.secure_url;
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            {new:true}
        ).select("-password");

        res.status(200).json({
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            profilePic: updatedUser.profilePic,
        });
    }
    catch(e){
        console.error("Error al actualizar perfil",e);
        res.status(500).json({message:"Internal server error"});
    }
}