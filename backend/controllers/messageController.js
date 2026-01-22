import Message from "../db/models/Message.js";
import User from "../db/models/User.js";
import cloudinary from "../utils/cloudinary.js";
import { getReceiverSocketId, io } from "../utils/socket.js";

export const getAllContacts = async (req,res) => {
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    }
    catch(e){
        console.log("Error in getAllContacts",e);
        res.status(500).json({message:"Server error"});
    }
};

export const getMessageByUserId = async (req,res) => {
    try{
        const {id:userToChatId} = req.params;
        const myId = req.user._id;

        const message = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId},
            ]
        });
        res.status(200).json(message);
    }
    catch(e){
        console.log("Error in getMessage controller:",e);
        res.status(500).json({error:"Internal server Error"});

    }
};

export const sendMessage = async (req,res) => {
    try{
        const {text,image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl; //variable con let pq se va a cambiar
        if (image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        });
        await newMessage.save();

        // todo: enviar mensje en tiempo real si el usuario esta online con socket
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
        };
        res.status(201).json(newMessage);
    }
    catch(e){
        console.log("Erroor in sendMessage controller",e);
        res.status(500).json({error:"Internal Server Error"});
    }
};

export const getChatPartners = async (req,res) =>{
    try{
        const loggedInUserId = req.user._id;
        //encontrar todos los mensajes donde el usuario manda o recive mensajes, ordenados por fecha más reciente
        const messages = await Message.find({
            $or:[{senderId:loggedInUserId},{receiverId:loggedInUserId}]
        }).sort({createdAt: -1});
        
        const getChatPartnersIds = [
            ...new Set(
                messages.map((msg) =>
                msg.senderId.toString() === loggedInUserId.toString() 
                ? msg.receiverId.toString()
                : msg.senderId.toString()
                //si el senderId es el del usuario logueado entonces quiero el id del que recibe y si no el que manda
                )
            ),
        ];
        
        //el Set es para eliminar duplicados
        const chatPartners = await User.find({_id:{$in:getChatPartnersIds}}).select("-password");
        
        // Crear un mapa para obtener el último mensaje de cada chat
        const lastMessageMap = {};
        messages.forEach((msg) => {
            const partnerId = msg.senderId.toString() === loggedInUserId.toString() 
                ? msg.receiverId.toString()
                : msg.senderId.toString();
            
            if (!lastMessageMap[partnerId] || new Date(msg.createdAt) > new Date(lastMessageMap[partnerId].createdAt)) {
                lastMessageMap[partnerId] = {
                    text: msg.text,
                    createdAt: msg.createdAt,
                    senderId: msg.senderId.toString()
                };
            }
        });
        
        // Ordenar los chats por la fecha del último mensaje
        const sortedChatPartners = chatPartners.sort((a, b) => {
            const lastMsgA = lastMessageMap[a._id.toString()];
            const lastMsgB = lastMessageMap[b._id.toString()];
            
            if (!lastMsgA && !lastMsgB) return 0;
            if (!lastMsgA) return 1;
            if (!lastMsgB) return -1;
            
            return new Date(lastMsgB.createdAt) - new Date(lastMsgA.createdAt);
        });
        
        // Agregar información del último mensaje a cada chat
        const chatsWithLastMessage = sortedChatPartners.map(partner => {
            const lastMsg = lastMessageMap[partner._id.toString()];
            return {
                ...partner.toObject(),
                lastMessage: lastMsg ? lastMsg.text : null,
                lastMessageDate: lastMsg ? lastMsg.createdAt : null
            };
        });
        
        res.status(200).json(chatsWithLastMessage);
    }
    catch(e){
        console.log("Erroor in getChatPartners controller",e);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const searchUsers = async (req,res) => {
    try{
        const loggedInUserId = req.user._id;
        const { query } = req.query;
        
        if(!query || query.trim() === ''){
            return res.status(400).json({message:"Query parameter is required"});
        }

        // Buscar usuarios por nombre que coincida con el query (case insensitive)
        const users = await User.find({
            _id: {$ne: loggedInUserId},
            fullName: { $regex: query, $options: 'i' }
        }).select("-password").limit(20);

        res.status(200).json(users);
    }
    catch(e){
        console.log("Error in searchUsers controller",e);
        res.status(500).json({error:"Internal Server Error"});
    }
}