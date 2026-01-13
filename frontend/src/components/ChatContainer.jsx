import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import {useAuthStore} from "../store/useAuthStore.jsx";
import ChatHeader from "./ChatHeader.jsx";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton.jsx";
import NoChatHistoryPlaceHolder from "./NoChatHistoryPlaceHolder.jsx";
import MessageInput from "./MessageInput.jsx";


function ChatContainer() {
    const {
        selectedUser,
        messages,
        isMessagesLoading,
        getMessageByUserId,
        subscribeToMessages,
        unSubscribeFromNewMessages,
    } = useChatStore();
    const { authUser } = useAuthStore();
    const messageEndRef = useRef(null);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    useEffect(() => {
        getMessageByUserId(selectedUser._id);
        subscribeToMessages();
        return() => unSubscribeFromNewMessages();
    }, [selectedUser,getMessageByUserId,subscribeToMessages,unSubscribeFromNewMessages]);

    return (
        <>
            <ChatHeader />
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length > 0 && !isMessagesLoading ? (
                    <div>
                    {messages.map((msg) => (
                        <div key={msg._id} className={`flex ${msg.senderId === authUser._id ? "justify-end" : "justify-start"}`}>
                            <div
                            className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                                msg.senderId === authUser._id
                                ? "bg-white text-black rounded-br-sm"
                                : "bg-neutral-900 text-white rounded-bl-sm border border-neutral-800"
                            }`}
                            >
                            <p className="text-sm leading-relaxed">{msg.text}</p>
                            {/* <span
                                className={`text-xs mt-1 block ${msg.senderId === authUser._id ? "text-neutral-600" : "text-neutral-400"}`}
                            >
                                {msg.time}
                            </span> */}
                            </div>
                        </div>
                    ))}
                    <div ref={messageEndRef} />
                    </div>
                ) : isMessagesLoading ? (
                    <MessagesLoadingSkeleton />
                ) : (
                    <NoChatHistoryPlaceHolder name={selectedUser.fullName} />
                )}
          </div>
          <MessageInput />
        </>
    )
}

export default ChatContainer