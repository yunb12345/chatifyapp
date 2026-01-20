import {create} from "zustand";
import {axiosInstance} from "../lib/axios.js";
import { useAuthStore } from "./useAuthStore.jsx";


export const useChatStore = create((set,get) => ({
    allContacts: [],
    chats:[],
    messages:[],
    activeTabs:"chats",
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
    isSoundEnabled:localStorage.getItem("isSoundEnabled") === "true" || false,
    toggleSound:()=>{
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
        set({isSoundEnabled:!get().isSoundEnabled});
    },
    setActiveTabs:(tab)=>{
        set({activeTabs:tab});
    },
    setSelectedUser:(selectedUser)=>{
        set({selectedUser});
    },
    getAllContacts: async() =>{
        set({isUsersLoading:true});
        try{
            const res = await axiosInstance.get("/message/contacts");
            set({allContacts:res.data});
        }
        catch(e){
            console.log("Error al obtener contactos",e);
        }
        finally{
            set({isUsersLoading:false});
        }
    },
    getMyChatPartners: async() =>{
        set({isUsersLoading:true});
        try{
            const res = await axiosInstance.get("/message/chats");
            set({chats:res.data});
        }
        catch(e){
            console.log("Error al obtener chats",e);
        }
        finally{
            set({isUsersLoading:false});
        }
    },
    getMessageByUserId: async(userId) =>{
        set({isMessagesLoading:true});
        try{
            const res = await axiosInstance.get(`/message/${userId}`);
            console.log("Messages fetched for userId", userId, res.data);
            set({messages:res.data});
        }
        catch(e){
            console.log("Error al obtener mensajes",e);
        }
        finally{
            set({isMessagesLoading:false});
        }
    },
    sendMessage: async(messageData) =>{
        const {selectedUser,messages} = get();
        const {authUser} = useAuthStore.getState();

        const tempId = `temp-${Date.now()}`;
        const optimisticMessage = {
            _id: tempId,
            senderId: authUser._id,
            receiverId: selectedUser._id,
            text: messageData.text,
            image: messageData.image || null,
            createdAt: new Date().toISOString(),
            isOptimistic: true,
        };
        set({messages: [...messages, optimisticMessage]});
        if (!selectedUser) return;
        try{
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
            set({messages:messages.concat(res.data) });
            
            // Actualizar la lista de chats después de enviar un mensaje
            get().getMyChatPartners();

        }catch(e){
            console.log("Error al enviar mensaje",e);
        }
    },
    subscribeToMessages: () => {
        const {selectedUser} = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;
        if (!socket) return;
        
        socket.on("newMessage",(newMessage) => {
            const currentMessages = get().messages;
            set({messages:[...currentMessages,newMessage]});
            
            // Actualizar la lista de chats cuando se recibe un nuevo mensaje
            // para mantener el orden por último mensaje
            get().getMyChatPartners();
        });
    },
    unSubscribeFromNewMessages: () => {
        const socket = useAuthStore.getState().socket;
        if (!socket) return;
        socket.off("newMessage");
    },
    searchUsers: async(query) => {
        set({isUsersLoading:true});
        try{
            const res = await axiosInstance.get(`/message/search?query=${encodeURIComponent(query)}`);
            return res.data;
        }
        catch(e){
            console.log("Error al buscar usuarios",e);
            return [];
        }
        finally{
            set({isUsersLoading:false});
        }
    },

}));