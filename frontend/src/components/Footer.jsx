import { Mail, Facebook, Twitter, Linkedin, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Chatify</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Comunicación instantánea para equipos modernos. Diseñado para la velocidad,
              construido para la colaboración.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Producto</h4>
            <ul className="space-y-2">
              <li>
                <a href="#caracteristicas" className="text-white/60 hover:text-white text-sm transition-colors">
                  Características
                </a>
              </li>
              <li>
                <a href="#precios" className="text-white/60 hover:text-white text-sm transition-colors">
                  Precios
                </a>
              </li>
              <li>
                <a href="/chat" className="text-white/60 hover:text-white text-sm transition-colors">
                  Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li>
                <a href="#sobre-nosotros" className="text-white/60 hover:text-white text-sm transition-colors">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#blog" className="text-white/60 hover:text-white text-sm transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-white/60 hover:text-white text-sm transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Síguenos</h4>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5 text-white/70" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-white/70" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-white/70" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-white/70" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 text-white/70" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Chatify. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#privacidad" className="text-white/60 hover:text-white transition-colors">
              Privacidad
            </a>
            <a href="#terminos" className="text-white/60 hover:text-white transition-colors">
              Términos
            </a>
            <a href="#cookies" className="text-white/60 hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

