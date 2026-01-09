import {MessageCircleIcon} from "lucide-react";

function NoChatsFound() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <MessageCircleIcon className="w-16 h-16 text-slate-500 mb-4" />
            <div className="text-2xl font-bold text-slate-400 mb-2">No chats found</div>
            <p className="text-slate-500">Start a new conversation or select an existing chat</p>
        </div>
    );
}

export default NoChatsFound;