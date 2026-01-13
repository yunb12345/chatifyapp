import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import UserLoadingSkeleton from "./UserLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

function ChatList() {
    const {getMyChatPartners, chats, isUsersLoading, setSelectedUser,selectedUser} = useChatStore();
    const {onlineUsers} = useAuthStore();

    useEffect(() => {
        getMyChatPartners();
    }, [getMyChatPartners]);
    if (isUsersLoading) return <UserLoadingSkeleton />;
    if (chats.length === 0) return <NoChatsFound />;

    return (
        <>
            <div className="flex-1 overflow-y-auto">
                {chats.map((chat) => (
                <button
                    key={chat.id}
                    onClick={() => setSelectedUser(chat)}
                    className={`w-full p-4 flex items-center gap-3 hover:bg-neutral-900 transition-colors border-b border-neutral-800 ${
                    selectedUser === chat ? "bg-neutral-900" : ""
                    }`}
                >
                    <div className={`avatar ${onlineUsers.includes(chat._id) ? 'online' : 'offline'}`}>
                        <div className="relative">
                            <img src={chat.profilePic || "/default-profile.png"} alt={chat.fullName} className="h-12 w-12 rounded-full" />
                            <div className="absolute bottom-0 right-0 h-3 w-3 bg-white rounded-full border-2 border-black" />
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