import { useState } from "react";
import { MessageCircle, Phone, Video, MoreVertical, Send, Paperclip, Smile, Search } from "lucide-react";
import ChatList from "../ChatList";
import ChatContainer from "../ChatContainer";
import NoChatSelected from "../NoChatSelected";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";

export default function ChatPage() {
  const { selectedUser } = useChatStore();
  const { logout } = useAuthStore();

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
          <button onClick={handleLogout} className="px-4 py-2 border border-neutral-800 text-white rounded-md text-sm hover:bg-neutral-900 transition-colors">
            Cerrar Sesion
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Lista de Chats */}
        <aside className="w-full sm:w-80 border-r border-neutral-800 bg-black flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-neutral-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Buscar conversaciones..."
                className="w-full pl-9 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>

          {/* Chat List */}
          <ChatList />
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col bg-black">
          {selectedUser ? <ChatContainer /> : <NoChatSelected />}
        </main>
      </div>
    </div>
  )
}