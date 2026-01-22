import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import UserLoadingSkeleton from "./UserLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

function ChatList({ searchQuery = "" }) {
    const {getMyChatPartners, chats, isUsersLoading, setSelectedUser,selectedUser} = useChatStore();
    const {onlineUsers} = useAuthStore();

    useEffect(() => {
        getMyChatPartners();
    }, [getMyChatPartners]);
    
    // Filtrar chats basándose en el término de búsqueda
    const filteredChats = chats.filter((chat) => {
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        return chat.fullName?.toLowerCase().includes(query) || 
               chat.email?.toLowerCase().includes(query);
    });

    if (isUsersLoading) return <UserLoadingSkeleton />;
    if (chats.length === 0) return <NoChatsFound />;
    if (filteredChats.length === 0 && searchQuery.trim()) {
        return (
            <div className="flex-1 flex items-center justify-center p-8">
                <p className="text-neutral-400 text-center">
                    No se encontraron conversaciones con "{searchQuery}"
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="flex-1 overflow-y-auto">
                {filteredChats.map((chat) => (
                <button
                    key={chat._id}
                    onClick={() => setSelectedUser(chat)}
                    className={`w-full p-4 flex items-center gap-3 hover:bg-neutral-900 transition-colors border-b border-neutral-800 ${
                    selectedUser?._id === chat._id ? "bg-neutral-900" : ""
                    }`}
                >
                    <div className={`avatar ${onlineUsers.includes(chat._id) ? 'online' : 'offline'}`}>
                        <div className="relative">
                            <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName} className="h-12 w-12 rounded-full" />
                            {onlineUsers.includes(chat._id) && (
                              <div className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-[#E5E7EB] rounded-full border-2 border-black" />
                            )}
                        </div>
                    </div>
                    <div className="flex-1 text-left min-w-0">
                        <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-white truncate">{chat.fullName}</span>
                            {/* <span className="text-xs text-neutral-500">{chat.time}</span> */}
                        </div>
                        {/* <div className="flex items-center justify-between">
                            <p className="text-sm text-neutral-400 truncate">{chat.lastMessage}</p>
                            {chat.unread && (
                            <span className="ml-2 bg-white text-black text-xs rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 font-medium">
                                {chat.unread}
                            </span>
                            )}
                        </div> */}
                    </div>
                </button>
                ))}
            </div>
        </>
    )

};
export default ChatList;