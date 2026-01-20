# Chatify 💬

Chatify es una aplicación de chat en tiempo real desarrollada con una arquitectura
frontend + backend en un solo repositorio (monorepo).

## 🧠 Descripción
La aplicación permite a los usuarios:
- Registrarse e iniciar sesión
- Enviar y recibir mensajes
- Comunicarse en tiempo real
- Utilizar una API REST para la gestión de usuarios y mensajes

El frontend es una SPA y el backend sirve los archivos estáticos en producción.

---

## 🛠️ Tecnologías

### Backend
- Node.js
- Express
- MongoDB

### Frontend
- React
- Vite
- Tailwind

---

## 🧪 ENV

```bash
PORT=3000
MONGO_URI=your_mongo_uri_here

NODE_ENV=development

JWT_SECRET=your_jwt_secret

RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_email_from_address
EMAIL_FROM_NAME=your_email_from_name

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

---

## 🧪 Desarrollo del Frontend

```bash
cd frontend
npm install
npm run dev
```

## 🧪 Desarrollo del Backend

```bash
cd backend
npm install
npm run dev
```

---

## 🚀 Deploy y Producción
En la raiz del proyecto
```bash
npm run build 
npm run start
```