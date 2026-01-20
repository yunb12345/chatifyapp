import { useState } from "react";
import { MessageCircle, Phone, Video, MoreVertical, Send, Paperclip, Smile, Search, UserPlus, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChatList from "../ChatList";
import ChatContainer from "../ChatContainer";
import NoChatSelected from "../NoChatSelected";
import SearchUsersModal from "../SearchUsersModal";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";

export default function ChatPage() {
  const { selectedUser } = useChatStore();
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };
  
  return (
    <div className="h-screen flex flex-col bg-black">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-black px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => window.location.href = '/'} className="flex items-center gap-2 cursor-pointer">
              <MessageCircle className="h-6 w-6 text-white" />
              <span className="text-xl font-semibold text-white hidden sm:inline">Chatify</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate("/profile")} 
              className="flex items-center gap-2 px-3 py-2 text-white hover:bg-neutral-900/80 rounded-lg transition-all duration-200 border border-transparent hover:border-[#E5E7EB]/20"
              title="Ver perfil"
            >
              <img
                src={authUser?.profilePic || "/avatar.png"}
                alt={authUser?.fullName}
                className="h-8 w-8 rounded-full object-cover border border-[#E5E7EB]/30"
              />
              <span className="hidden sm:inline text-sm font-medium">{authUser?.fullName}</span>
            </button>
            <button onClick={handleLogout} className="px-4 py-2 border border-neutral-800 text-white rounded-md text-sm hover:bg-neutral-900 transition-colors">
              Cerrar Sesion
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Lista de Chats */}
        <aside className="w-full sm:w-80 border-r border-neutral-800 bg-black flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Buscar conversaciones..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#E5E7EB]/50 focus:border-[#E5E7EB]/50"
                />
              </div>
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="p-2 bg-neutral-900 border border-neutral-800 text-white rounded-md hover:bg-neutral-800 transition-colors"
                title="Buscar nuevos usuarios"
              >
                <UserPlus className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Chat List */}
          <ChatList searchQuery={searchQuery} />
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col bg-black">
          {selectedUser ? <ChatContainer /> : <NoChatSelected />}
        </main>
      </div>

      {/* Search Users Modal */}
      <SearchUsersModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />
    </div>
  )
}