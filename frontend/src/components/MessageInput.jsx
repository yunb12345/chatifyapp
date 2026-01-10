import { useRef, useState } from "react";
import { Send, Paperclip, Smile } from "lucide-react";
import { useChatStore } from "../store/useChatStore.jsx";

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
    return (
        <>
        <div className="border-t border-neutral-800 bg-black p-4">
            <div className="flex items-center gap-2">
                <button className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-md transition-colors">
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
                <button className="absolute right-1 top-1/2 -translate-y-1/2 p-2 text-neutral-400 hover:text-white rounded-md transition-colors">
                    <Smile className="h-5 w-5" />
                </button>
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