import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        requiered:true,
        unique:true
    },
    fullName:{
        type: String,
        requiered:true,
    },
    password:{
        type: String,
        requiered:true,
    },
},
{timestamps:true}
);

const User = mongoose.model("User", userSchema);

export default User;