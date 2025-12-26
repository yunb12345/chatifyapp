import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log('Conetado a la DB de Mongo', conn.connection.host)
    }
    catch(e){
        console.log('Error al conectar a Mongo', e)
        process.exit(1); //1 status significa fallo y 0 exito
    }
};