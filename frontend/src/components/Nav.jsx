import { Menu, ShoppingCart } from "lucide-react"
import { useState } from "react"

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-[#E5E7EB]/10">
      <nav className="px-6 py-6 flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
          <a href="/" className="text-xl font-bold text-[#E5E7EB]">
            Chatify
          </a>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.location.href = '/login'}
            className="px-6 py-2 border border-[#E5E7EB]/30 text-[#E5E7EB] text-sm font-medium hover:bg-[#E5E7EB]/10 transition-colors rounded-full"
          >
            Iniciar Sesión
          </button>
          <button 
            onClick={() => window.location.href = '/login?register=true'}
            className="px-6 py-2 bg-[#E5E7EB] text-black text-sm font-medium hover:bg-[#D1D5DB] transition-colors rounded-full"
          >
            Registrarse
          </button>
        </div>
      </nav>
    </header>
  )
}

