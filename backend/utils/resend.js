import {Resend} from "resend";
import dotenv from "dotenv";

dotenv.config();

export const resendClient = new Resend(process.env.RESEND_APY_KEY);

export const sender = {
    email: process.env.EMAIL_FROM,
    name: process.env.EMAIL_NAME,
};
