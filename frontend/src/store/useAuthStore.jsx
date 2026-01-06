import {create} from "zustand"; //zustand para gestionar el estado global
import {axiosInstance} from "../lib/axios.js";

export const useAuthStore = create((set)=>({ //la variable set sirve para actualizar los estados
    authUser:null,
    isCheckingAuth: true,
    isSigningUp:false,
    checkAuth: async () =>{
        try{
            const res = await axiosInstance.get("/auth/check");
            set({authUser:res.data});
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

            toast.succes("Cuenta creada exitosamente!-");
        }
        catch(e){
            console.log("Error al registrarse",e);
            toast.error(e.response.data.message);
        }
        finally{
            set({isSigningUp:false})
        }
    }
}));