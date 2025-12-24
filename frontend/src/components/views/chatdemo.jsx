import { useState } from "react"
import { MessageCircle, Phone, Video, MoreVertical, Send, Paperclip, Smile, Search } from "lucide-react"

export default function ChatDemo() {
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
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`w-full p-4 flex items-center gap-3 hover:bg-neutral-900 transition-colors border-b border-neutral-800 ${
                  selectedChat === chat.id ? "bg-neutral-900" : ""
                }`}
              >
                <div className="relative">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="h-12 w-12 rounded-full"
                  />
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-white rounded-full border-2 border-black" />
                  )}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-white truncate">{chat.name}</span>
                    <span className="text-xs text-neutral-500">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-neutral-400 truncate">{chat.lastMessage}</p>
                    {chat.unread && (
                      <span className="ml-2 bg-white text-black text-xs rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 font-medium">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col bg-black">
          {/* Chat Header */}
          <div className="border-b border-neutral-800 bg-black px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={currentChat?.avatar}
                    alt={currentChat?.name}
                    className="h-10 w-10 rounded-full"
                  />
                  {currentChat?.online && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-white rounded-full border-2 border-black" />
                  )}
                </div>
                <div>
                  <h2 className="font-semibold text-white">{currentChat?.name}</h2>
                  <p className="text-xs text-neutral-400">
                    {currentChat?.online ? "En línea" : "Última vez ayer"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-md transition-colors">
                  <Phone className="h-5 w-5" />
                </button>
                <button className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-md transition-colors">
                  <Video className="h-5 w-5" />
                </button>
                <button className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-md transition-colors">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sent ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    msg.sent
                      ? "bg-white text-black rounded-br-sm"
                      : "bg-neutral-900 text-white rounded-bl-sm border border-neutral-800"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <span
                    className={`text-xs mt-1 block ${msg.sent ? "text-neutral-600" : "text-neutral-400"}`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

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