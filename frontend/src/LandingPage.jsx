import { Quote, ArrowRight } from "lucide-react"
import { HiChatBubbleLeftRight } from "react-icons/hi2"
import Nav from "./components/Nav"
import Footer from "./components/Footer"

export default function LandingPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Nav />

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center px-6 py-20 pt-32 overflow-hidden">
        {/* Borders */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10"></div>
        <div className="absolute left-0 bottom-0 right-0 h-px bg-white/10"></div>

        {/* Left Vertical Text */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center z-10 hidden lg:block">
          <div className="flex flex-col items-center gap-2">
            <span className="text-white font-medium text-sm tracking-wider">CHAT ONLINE</span>
            <div className="w-12 h-px bg-white"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left Side - Preview and Info */}
          <div className="flex flex-col items-start space-y-6">
            {/* Preview card */}
            <div className="w-full max-w-md mx-auto bg-white/10 rounded-2xl p-8 shadow-lg backdrop-blur-sm">
              <div className="bg-black rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-white/20 rounded w-3/4"></div>
                    <div className="h-3 bg-white/20 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-end">
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-white rounded w-2/3 ml-auto"></div>
                    <div className="h-3 bg-white rounded w-1/2 ml-auto"></div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/30"></div>
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="text-5xl md:text-6xl font-bold text-white">Chatify</div>

            {/* Description */}
            <div className="space-y-4 max-w-md">
              <div className="flex items-start gap-3">
                <Quote className="h-6 w-6 text-white flex-shrink-0 mt-1" />
                <p className="text-white/70 text-base leading-relaxed">
                  Comunicación instantánea para equipos modernos. Diseñado para la velocidad,
                  construido para la colaboración. Interfaz limpia, rápida y enfocada en resultados.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => window.location.href = '/chat'}
                className="px-8 py-3 border-2 border-white text-white font-medium hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 rounded-full"
              >
                COMENZAR AHORA
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => {
                  document.getElementById('caracteristicas')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-8 py-3 border-2 border-white/30 text-white/80 font-medium hover:border-white/50 hover:text-white transition-all duration-300 rounded-full"
              >
                SABER MÁS
              </button>
            </div>
          </div>

          {/* Right Heading */}
          <div className="relative hidden md:block">
            <div className="absolute top-0 right-0 transform rotate-12 origin-top-right">
              <div className="relative">
                <div className="absolute -top-8 -right-8 w-16 h-16 border border-white/40 rounded-full flex items-center justify-center">
                  <span className="text-white/40 text-xs font-mono">01</span>
                </div>
                <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
                  Chat with<br />
                  Speed &<br />
                  Efficiency
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Backers Section */}
      <section id="caracteristicas" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* What is Chatify Section */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Side - Text */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                ¿Qué es Chatify?
              </h2>
              <p className="text-white/60 text-lg leading-relaxed">
                La comunicación en tiempo real y la colaboración en equipo son increíblemente importantes
                en el mundo moderno. Desafortunadamente, muchas plataformas de chat tienen interfaces
                complicadas y carecen de la calidad de diseño necesaria. Para lograr una adopción masiva
                y una experiencia verdaderamente fluida, superar estos obstáculos será clave.
                Y aquí es donde comienza nuestra historia.
              </p>
            </div>

            {/* Right Side - Chat Icon */}
            <div className="relative flex items-center justify-center py-12">
              <HiChatBubbleLeftRight 
                className="w-64 h-64 md:w-80 md:h-80 text-white opacity-30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para comenzar?
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
            Únete a miles de equipos que ya están usando Chatify para mejorar su comunicación.
            Comienza gratis hoy mismo.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => window.location.href = '/chat'}
              className="px-8 py-4 border-2 border-white text-white font-medium hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 text-lg rounded-full"
            >
              COMENZAR GRATIS
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => {
                document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-8 py-4 border-2 border-white/30 text-white/80 font-medium hover:border-white/50 hover:text-white transition-all duration-300 text-lg rounded-full"
            >
              CONTACTAR VENTAS
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 px-6 bg-white/5 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ponte en contacto
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
            ¿Tienes preguntas? Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo antes posible.
          </p>
          <div className="bg-black/50 rounded-xl p-8 border border-white/10 max-w-md mx-auto">
            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Tu email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>
              <div>
                <textarea
                  placeholder="Tu mensaje"
                  rows="4"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-8 py-3 border-2 border-white text-white font-medium hover:bg-white hover:text-black transition-all duration-300 rounded-full"
              >
                ENVIAR MENSAJE
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
