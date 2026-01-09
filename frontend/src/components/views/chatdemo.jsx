import { useState } from "react";
import { MessageCircle, Phone, Video, MoreVertical, Send, Paperclip, Smile, Search } from "lucide-react";
import ChatList from "../ChatList";
import ChatContainer from "../ChatContainer";
import NoChatSelected from "../NoChatSelected";
import { useChatStore } from "../../store/useChatStore";

export default function ChatDemo() {
  const { selectedUser } = useChatStore();
  const [message, setMessage] = useState("")
  const [selectedChat, setSelectedChat] = useState(1)
  const [messages, setMessages] = useState([
    { id: 1, text: "¡Hola! ¿Cómo estás?", time: "10:30", sent: false },
    { id: 2, text: "¡Muy bien! ¿Y tú?", time: "10:31", sent: true },
    { id: 3, text: "Genial, trabajando en el nuevo proyecto", time: "10:32", sent: false },
    { id: 4, text: "¿Necesitas ayuda con algo?", time: "10:32", sent: false },
    { id: 5, text: "Sí, ¿podemos revisar el diseño más tarde?", time: "10:33", sent: true },
    { id: 6, text: "Claro, a las 3pm te parece bien?", time: "10:34", sent: false },
    { id: 7, text: "Perfecto, nos vemos entonces 👍", time: "10:35", sent: true },
  ])

  const chats = [
    {
      id: 1,
      name: "María García",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      lastMessage: "Claro, a las 3pm te parece bien?",
      time: "10:34",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Equipo Desarrollo",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Team",
      lastMessage: "Juan: Subí los cambios al repo",
      time: "09:15",
      unread: 5,
    },
    {
      id: 3,
      name: "Carlos Ruiz",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
      lastMessage: "Gracias por la info!",
      time: "Ayer",
      online: true,
    },
    {
      id: 4,
      name: "Ana Martínez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
      lastMessage: "¿Viste el documento?",
      time: "Ayer",
    },
    {
      id: 5,
      name: "Proyecto Alpha",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Project",
      lastMessage: "Laura: Reunión mañana 10am",
      time: "Lun",
    },
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        time: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
        sent: true,
      }
      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  const currentChat = chats.find((chat) => chat.id === selectedChat)

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
          <div className="text-sm text-neutral-400">Demo de la Aplicación</div>
          <button onClick={() => window.location.href = '/'} className="px-4 py-2 border border-neutral-800 text-white rounded-md text-sm hover:bg-neutral-900 transition-colors">
            Volver
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

          {/* Message Input */}
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
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
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
        </main>
      </div>
    </div>
  )
}