import {create} from "zustand";
import {axiosInstance} from "../lib/axios.js";

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

}));