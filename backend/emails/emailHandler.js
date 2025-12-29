import { createWelcomeEmailTemplate } from "./emailTemplate.js";
import {resendClient, sender} from "../utils/resend.js";

export const sendWelcomeEmail = async (email,name,clientURL) => {
    const {data,error} = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: 'Bienvenido a Chatify',
        html: createWelcomeEmailTemplate(name,clientURL),
    });
    if (error){
        console.error("Error enviando el email",error);
        throw new Error("Error al enviar email");
    }
    console.log("Email enviado");
    return data;
}