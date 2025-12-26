import User from "../db/models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/jwtvalidator.js";

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
            await newUser.save()
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
            });
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