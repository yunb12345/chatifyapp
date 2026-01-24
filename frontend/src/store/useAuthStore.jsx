import {create} from "zustand"; //zustand para gestionar el estado global
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";
import {io} from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "https://profound-spontaneity-production-e505.up.railway.app";

export const useAuthStore = create((set,get)=>({ //la variable set sirve para actualizar los estados
    authUser:null,
    isCheckingAuth: true,
    isSigningUp:false,
    isLogginIn:false,
    socket:null,
    onlineUsers:[],

    checkAuth: async () =>{
        try{
            const res = await axiosInstance.get("/auth/check");
            set({authUser:res.data});
            get().connectSocket();
        }
        catch(e){
            console.log("Error en authCheck",e);
            set({authUser:null});
        }finally{
            set({isCheckingAuth:false});
        }
    },

    signup: async(data) =>{
        set({isSigningUp:true})
        try{
            const res = await axiosInstance.post("/auth/signup",data);
            set({authUser:res.data});

            toast.success("Cuenta creada exitosamente!");
            get().connectSocket();
        }
        catch(e){
            console.log("Error al registrarse",e);
            toast.error(e.response.data.message);
        }
        finally{
            set({isSigningUp:false})
        }
    },

    login: async(data) =>{
        set({isLogginIn:true})
        try{
            const res = await axiosInstance.post("/auth/login",data);
            set({authUser:res.data});
            get().connectSocket();

            toast.success("Cuenta logueada exitosamente!");

        }
        catch(e){
            console.log("Error al loguearse",e);
            const errorMessage = e.response?.data?.message || e.message || "Error al iniciar sesión";
            toast.error(errorMessage);
        }
        finally{
            set({isLogginIn:false})
        }
    },

    logout: async () =>{
        try{
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Cerraste sesión exitosamente!");
            get().disconnectSocket();
        }
        catch(e){
            console.log("Error al cerrar sesión",e);
            toast.error("Error al cerrar sesión");
        }
    },
    
    connectSocket: () =>{
        const {authUser} = get();
        if(!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL,{
            withCredentials:true //esto asegura que las cookies se envien junto con la conexion
        });

        socket.connect();
        
        set({socket});//almacenamos la instancia del socket en el estado

        //escuchar evento cuando los usuarios estan conectados
        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds});
        });
    },

    disconnectSocket: () =>{
        if(get().socket?.connected) get().socket.disconnect();
    },
    updateProfile: async(updateData) => {
        try{
            const res = await axiosInstance.put("/auth/update-profile", updateData);
            set({authUser: res.data});
            toast.success("Perfil actualizado exitosamente!");
            return res.data;
        }
        catch(e){
            console.log("Error al actualizar perfil",e);
            const errorMessage = e.response?.data?.message || e.message || "Error al actualizar perfil";
            toast.error(errorMessage);
            throw e;
        }
    },
}));