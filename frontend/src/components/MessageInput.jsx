import { useRef, useState } from "react";
import { Send, Paperclip, XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore.jsx";
import { toast } from "react-hot-toast";

function MessageInput() {
    const [message, setMessage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const {sendMessage} = useChatStore();

    const handleSendMessage = (e) => {
        e.preventDefault();
        if(!message.trim()) return;
        sendMessage({
            text: message.trim(),
            image: imagePreview
        });
        setMessage("");
        setImagePreview("");
        if(fileInputRef.current){
            fileInputRef.current.value = "";
        };
    };
    const removeImage = () => {
        setImagePreview(null);
        if(fileInputRef.current){
            fileInputRef.current.value = "";
        };
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Por favor selecciona un archivo de imagen válido.");
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };
    return (
        <>
        <div className="border-t border-neutral-800 bg-black p-4">
            {imagePreview && (
                <div className="max-w-3xl mx-auto mb-3 flex items-center">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border botder-slate-700"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
                        >
                        <XIcon className="h-4 w-4" />
                        </button>

                    </div>
                </div>
            )}
            <div className="flex items-center gap-2">
                <button 
                    className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-md transition-colors" 
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Paperclip className="h-5 w-5" />
                </button>
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        className="w-full px-4 py-2 pr-10 bg-neutral-900 border border-neutral-800 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </div>
                <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="p-2 bg-white text-black rounded-md hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Send className="h-5 w-5" />
                </button>
            </div>
        </div>
        </>
    )
};

export default MessageInput;