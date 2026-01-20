import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Camera, User, MessageCircle, Phone, Shield, Bell, LogOut, Edit2, Check, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { authUser, updateProfile, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [fullName, setFullName] = useState(authUser?.fullName || "");
  const [phone, setPhone] = useState(authUser?.phone || "");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [copied, setCopied] = useState(false);

  // Actualizar estados cuando authUser cambie
  useEffect(() => {
    if (authUser) {
      setFullName(authUser.fullName || "");
      setPhone(authUser.phone || "");
    }
  }, [authUser]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Por favor selecciona un archivo de imagen válido.");
      return;
    }

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          await updateProfile({ profilePic: reader.result });
        } catch (error) {
          console.error("Error al actualizar foto de perfil:", error);
        } finally {
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error al leer archivo:", error);
      setIsUploading(false);
    }
  };

  const handleSaveName = async () => {
    if (!fullName.trim()) {
      toast.error("El nombre no puede estar vacío");
      return;
    }
    try {
      await updateProfile({ fullName: fullName.trim() });
      setIsEditingName(false);
    } catch (error) {
      console.error("Error al actualizar nombre:", error);
    }
  };

  const handleSavePhone = async () => {
    try {
      await updateProfile({ phone: phone.trim() });
      setIsEditingPhone(false);
    } catch (error) {
      console.error("Error al actualizar teléfono:", error);
    }
  };

  const handleCopyPhone = () => {
    if (phone) {
      navigator.clipboard.writeText(phone);
      setCopied(true);
      toast.success("Teléfono copiado al portapapeles");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (!authUser) {
    navigate("/login");
    return null;
  }

  const isOnline = true; // Podrías obtener esto del store si tienes esa info

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      {/* Header */}
      <header className="border-b border-neutral-800/50 bg-black/95 backdrop-blur-sm px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/chat")}
            className="p-2 text-neutral-400 hover:text-gray-300 hover:bg-neutral-900/50 rounded-lg transition-all duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-semibold text-white">Perfil</h1>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Profile Picture and Name */}
        <div className="flex flex-col items-center py-10 px-4">
          <div className="relative mb-6">
            <div className="relative w-36 h-36 rounded-full overflow-hidden bg-neutral-900 border-2 border-[#E5E7EB] shadow-lg shadow-[#E5E7EB]/20">
              {isUploading ? (
                <div className="w-full h-full flex items-center justify-center bg-neutral-900">
                  <div className="w-8 h-8 border-2 border-[#E5E7EB]/30 border-t-[#E5E7EB] rounded-full animate-spin"></div>
                </div>
              ) : (
                <img
                  src={authUser.profilePic || "/avatar.png"}
                  alt={authUser.fullName}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 p-3 bg-[#E5E7EB] text-black rounded-full hover:bg-[#D1D5DB] transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Camera className="h-5 w-5" />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">{authUser.fullName}</h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#E5E7EB] rounded-full"></div>
            <p className="text-sm text-[#E5E7EB] font-medium">{isOnline ? "En línea" : "Desconectado"}</p>
          </div>
        </div>

        {/* Profile Info Cards */}
        <div className="px-4 pb-6 space-y-3">
          {/* Name Card */}
          <div className="bg-neutral-900/80 backdrop-blur-sm rounded-xl p-5 flex items-center gap-4 hover:bg-neutral-800/80 transition-all duration-200 cursor-pointer border border-neutral-800/50 shadow-lg">
            <div className="w-12 h-12 rounded-full bg-[#E5E7EB]/10 flex items-center justify-center flex-shrink-0 border border-[#E5E7EB]/20">
              <User className="h-6 w-6 text-[#E5E7EB]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-[#E5E7EB]/70 uppercase mb-2 tracking-wider font-medium">NOMBRE</p>
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    onBlur={handleSaveName}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSaveName();
                      } else if (e.key === "Escape") {
                        setFullName(authUser.fullName);
                        setIsEditingName(false);
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-neutral-800/50 border border-[#E5E7EB]/30 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E5E7EB]/50 focus:border-[#E5E7EB]"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveName}
                    className="p-2 text-[#E5E7EB] hover:bg-[#E5E7EB]/10 rounded-lg transition-colors"
                  >
                    <Check className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-white font-semibold text-lg">{authUser.fullName}</p>
                  <button
                    onClick={() => {
                      setFullName(authUser.fullName);
                      setIsEditingName(true);
                    }}
                    className="p-2 text-[#E5E7EB]/60 hover:text-[#E5E7EB] hover:bg-[#E5E7EB]/10 rounded-lg transition-all duration-200"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-neutral-900/80 backdrop-blur-sm rounded-xl p-5 flex items-center gap-4 border border-neutral-800/50 shadow-lg">
            <div className="w-12 h-12 rounded-full bg-[#E5E7EB]/10 flex items-center justify-center flex-shrink-0 border border-[#E5E7EB]/20">
              <MessageCircle className="h-6 w-6 text-[#E5E7EB]" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-[#E5E7EB]/70 uppercase mb-2 tracking-wider font-medium">INFO</p>
              <p className="text-white">¡Hola! Estoy usando Chatify.</p>
            </div>
          </div>

          {/* Phone Card */}
          <div className="bg-neutral-900/80 backdrop-blur-sm rounded-xl p-5 flex items-center gap-4 hover:bg-neutral-800/80 transition-all duration-200 cursor-pointer border border-neutral-800/50 shadow-lg">
            <div className="w-12 h-12 rounded-full bg-[#E5E7EB]/10 flex items-center justify-center flex-shrink-0 border border-[#E5E7EB]/20">
              <Phone className="h-6 w-6 text-[#E5E7EB]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-[#E5E7EB]/70 uppercase mb-2 tracking-wider font-medium">TELÉFONO</p>
              {isEditingPhone ? (
                <div className="flex items-center gap-2">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={handleSavePhone}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSavePhone();
                      } else if (e.key === "Escape") {
                        setPhone(authUser.phone || "");
                        setIsEditingPhone(false);
                      }
                    }}
                    placeholder="+54 9 11 1234-5678"
                    className="flex-1 px-3 py-2 bg-neutral-800/50 border border-[#E5E7EB]/30 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E5E7EB]/50 focus:border-[#E5E7EB] placeholder-neutral-500"
                    autoFocus
                  />
                  <button
                    onClick={handleSavePhone}
                    className="p-2 text-[#E5E7EB] hover:bg-[#E5E7EB]/10 rounded-lg transition-colors"
                  >
                    <Check className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-white font-medium">{authUser.phone || "No agregado"}</p>
                  <div className="flex items-center gap-1">
                    {authUser.phone && (
                      <button
                        onClick={handleCopyPhone}
                        className="p-2 text-[#E5E7EB]/60 hover:text-[#E5E7EB] hover:bg-[#E5E7EB]/10 rounded-lg transition-all duration-200"
                        title="Copiar teléfono"
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-[#E5E7EB]" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setPhone(authUser.phone || "");
                        setIsEditingPhone(true);
                      }}
                      className="p-2 text-[#E5E7EB]/60 hover:text-[#E5E7EB] hover:bg-[#E5E7EB]/10 rounded-lg transition-all duration-200"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Privacy Card */}
          <div className="bg-neutral-900/80 backdrop-blur-sm rounded-xl p-5 flex items-center gap-4 hover:bg-neutral-800/80 transition-all duration-200 cursor-pointer border border-neutral-800/50 shadow-lg">
            <div className="w-12 h-12 rounded-full bg-[#E5E7EB]/10 flex items-center justify-center flex-shrink-0 border border-[#E5E7EB]/20">
              <Shield className="h-6 w-6 text-[#E5E7EB]" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-[#E5E7EB]/70 uppercase mb-2 tracking-wider font-medium">PRIVACIDAD</p>
              <p className="text-white">Configurar privacidad</p>
            </div>
          </div>

          {/* Notifications Card */}
          <div className="bg-neutral-900/80 backdrop-blur-sm rounded-xl p-5 flex items-center gap-4 hover:bg-neutral-800/80 transition-all duration-200 cursor-pointer border border-neutral-800/50 shadow-lg">
            <div className="w-12 h-12 rounded-full bg-[#E5E7EB]/10 flex items-center justify-center flex-shrink-0 border border-[#E5E7EB]/20">
              <Bell className="h-6 w-6 text-[#E5E7EB]" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-[#E5E7EB]/70 uppercase mb-2 tracking-wider font-medium">NOTIFICACIONES</p>
              <p className="text-white">Administrar notificaciones</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full bg-red-500/10 border border-red-500/30 rounded-xl p-5 flex items-center gap-4 hover:bg-red-500/20 transition-all duration-200 mt-4 shadow-lg"
          >
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 border border-red-500/30">
              <LogOut className="h-6 w-6 text-red-500" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-white font-semibold">Cerrar sesión</p>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="px-4 py-8 text-center">
          <p className="text-xs text-[#E5E7EB]/50 font-medium">Chatify v1.0.0</p>
        </div>
      </div>
    </div>
  );
}
