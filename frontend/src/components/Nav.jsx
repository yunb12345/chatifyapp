import { Menu, ShoppingCart } from "lucide-react"
import { useState } from "react"

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <nav className="px-6 py-6 flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <button 
            className="text-white hover:text-gray-300 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <a href="/" className="text-xl font-bold text-white">
            Chatify
          </a>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.location.href = '/login'}
            className="px-6 py-2 border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-colors rounded-full"
          >
            Iniciar Sesión
          </button>
          <button 
            onClick={() => window.location.href = '/login?register=true'}
            className="px-6 py-2 bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors rounded-full"
          >
            Registrarse
          </button>
          <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            <ShoppingCart className="h-5 w-5 text-white" />
          </button>
        </div>
      </nav>
    </header>
  )
}

