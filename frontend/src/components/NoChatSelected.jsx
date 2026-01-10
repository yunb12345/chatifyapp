import {MessageCircleIcon} from "lucide-react";

const NoChatSelected = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <div className="size-20 bg-cyan-500/20 rounded-full flex items-center justify-center mb-6">
                <MessageCircleIcon className="size-10 text-cyan-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-200 mb-2">Selecciona una conversacion</h3>
            <p className="text-slate-500">Para iniciar una conversacion, selecciona un chat de la lista o busca un usuario.</p>

        </div>
    )
};
export default NoChatSelected;