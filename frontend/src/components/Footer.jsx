import { Mail, Facebook, Twitter, Linkedin, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#E5E7EB]/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#E5E7EB]">Chatify</h3>
            <p className="text-[#E5E7EB]/60 text-sm leading-relaxed">
              Comunicación instantánea para equipos modernos. Diseñado para la velocidad,
              construido para la colaboración.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[#E5E7EB] font-semibold mb-4">Producto</h4>
            <ul className="space-y-2">
              <li>
                <a href="#caracteristicas" className="text-[#E5E7EB]/60 hover:text-[#E5E7EB] text-sm transition-colors">
                  Características
                </a>
              </li>
            </ul>
          </div>

          {/* Equipo */}
          <div>
            <h4 className="text-[#E5E7EB] font-semibold mb-4">Equipo</h4>
            <ul className="space-y-2">
              <li>
                <a href="#sobre-nosotros" className="text-[#E5E7EB]/60 hover:text-[#E5E7EB] text-sm transition-colors">
                  Sobre Nosotros
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[#E5E7EB] font-semibold mb-4">Síguenos</h4>
            <div className="flex gap-3">
              <a 
                href="https://www.linkedin.com/in/agusyoon/" 
                target="_blank"
                rel="noreferrer noopener"
                className="w-10 h-10 rounded-full border border-[#E5E7EB]/30 flex items-center justify-center hover:bg-[#E5E7EB]/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-[#E5E7EB]/70" />
              </a>
              <a 
                href="https://github.com/yunb12345/chatifyapp" 
                target="_blank"
                rel="noreferrer noopener"
                className="w-10 h-10 rounded-full border border-[#E5E7EB]/30 flex items-center justify-center hover:bg-[#E5E7EB]/10 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 text-[#E5E7EB]/70" />
              </a>
            </div> 
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[#E5E7EB]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#E5E7EB]/60 text-sm">
            © {new Date().getFullYear()} Chatify. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

