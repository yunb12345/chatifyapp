import { Menu, ShoppingCart, ChevronLeft, ChevronRight, Mail, Facebook, Twitter, Linkedin, Quote } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      
      {/* Borders */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-black/10"></div>
      <div className="absolute left-0 bottom-0 right-0 h-px bg-black/10"></div>

      {/* Top Navigation */}
      <header className="relative z-10 px-6 py-6 flex items-center justify-between">
        <button className="text-black hover:text-gray-800 transition-colors">
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-black">ACCOUNT</span>
          <button className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors">
            <ShoppingCart className="h-5 w-5 text-black" />
          </button>
        </div>
      </header>

      {/* Left Vertical Text */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center z-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-black font-medium text-sm tracking-wider">CHAT ONLINE</span>
          <div className="w-12 h-px bg-black"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative min-h-[calc(100vh-200px)] flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          {/* Preview card */}
          <div className="flex flex-col items-start space-y-6">
            <div className="w-full max-w-md mx-auto bg-black/5 rounded-2xl p-8 shadow-lg">
              <div className="bg-white rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-black/10 rounded w-3/4"></div>
                    <div className="h-3 bg-black/10 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-end">
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-black rounded w-2/3 ml-auto"></div>
                    <div className="h-3 bg-black rounded w-1/2 ml-auto"></div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-black/20"></div>
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="text-4xl font-bold text-black">Chatify</div>

            {/* Description */}
            <div className="space-y-4 max-w-md">
              <div className="flex items-start gap-3">
                <Quote className="h-6 w-6 text-black flex-shrink-0 mt-1" />
                <p className="text-black/70 text-sm leading-relaxed">
                  Comunicación instantánea para equipos modernos. Diseñado para la velocidad,
                  construido para la colaboración. Interfaz limpia, rápida y enfocada en resultados.
                </p>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={() => window.location.href = '/chat'}
              className="px-8 py-3 border-2 border-black text-black font-medium hover:bg-black hover:text-white transition-all duration-300"
            >
              COMENZAR
            </button>
          </div>

          {/* Right Heading */}
          <div className="relative hidden md:block">
            <div className="absolute top-0 right-0 transform rotate-12 origin-top-right">
              <div className="relative">
                <div className="absolute -top-8 -right-8 w-16 h-16 border border-black/40 rounded-full flex items-center justify-center">
                  <span className="text-black/40 text-xs font-mono">01</span>
                </div>
                <h1 className="text-6xl md:text-7xl font-bold text-black leading-tight">
                  PRINCIPLES of<br />
                  & PRODUCT<br />
                  DESIGN
                </h1>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-6 left-0 right-0 px-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-black">01</span>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-black/30"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-black/30"></div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full border border-black/30 flex items-center justify-center hover:bg-black/10 transition-colors">
            <ChevronLeft className="h-5 w-5 text-black/70" />
          </button>
          <button className="w-10 h-10 rounded-full border border-black/30 flex items-center justify-center hover:bg-black/10 transition-colors">
            <ChevronRight className="h-5 w-5 text-black/70" />
          </button>
        </div>
      </div>

      {/* Right Social Icons */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-10">
        <a className="w-10 h-10 rounded-full border border-black/30 flex items-center justify-center hover:bg-black/10 transition-colors">
          <Mail className="h-5 w-5 text-black/70" />
        </a>
        <a className="w-10 h-10 rounded-full border border-black/30 flex items-center justify-center hover:bg-black/10 transition-colors">
          <Facebook className="h-5 w-5 text-black/70" />
        </a>
        <a className="w-10 h-10 rounded-full border border-black/30 flex items-center justify-center hover:bg-black/10 transition-colors">
          <Twitter className="h-5 w-5 text-black/70" />
        </a>
        <a className="w-10 h-10 rounded-full border border-black/30 flex items-center justify-center hover:bg-black/10 transition-colors">
          <Linkedin className="h-5 w-5 text-black/70" />
        </a>
      </div>

    </div>
  )
}
