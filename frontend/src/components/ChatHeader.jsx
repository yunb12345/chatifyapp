import {useChatStore} from "../store/useChatStore.jsx";
import { Phone, Video, MoreVertical } from "lucide-react";

function ChatHeader() {
  const { selectedUser } = useChatStore();
  return (
    <>
        <div className="border-b border-neutral-800 bg-black px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={selectedUser?.profilePic}
                    alt={selectedUser?.fullName}
                    className="h-10 w-10 rounded-full"
                  />
                  {/* {currentChat?.online && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-white rounded-full border-2 border-black" />
                  )} */}
                </div>
                <div>
                  <h2 className="font-semibold text-white">{selectedUser?.fullName}</h2>
                  {/* <p className="text-xs text-neutral-400">
                    {currentChat?.online ? "En línea" : "Última vez ayer"}
                  </p> */}
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
    </>
  )
}

export default ChatHeader;