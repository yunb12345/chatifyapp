import { useState, useEffect } from "react"
import { Mail, Lock, User, ArrowRight, Quote } from "lucide-react"
import Nav from "../Nav"
import {useAuthStore} from "../../store/useAuthStore";

export default function AuthPage() {
  const {signup,isSigningUp,login,isLoginIn} = useAuthStore();
  const [isRegister, setIsRegister] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  // Check URL params for register mode
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('register') === 'true') {
      setIsRegister(true)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isRegister) {
      // Handle registration
      const payload = {
        fullName: formData.name,
        email:formData.email,
        password:formData.password,
      }
      signup(payload);
      //console.log("Registro:", formData)
    } else {
      // Handle login
      const payload = {
        email:formData.email,
        password:formData.password,
      }
      login(payload);
      //console.log("Login:", { email: formData.email, password: formData.password })
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Nav />
      
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-8 lg:px-10 py-20 pt-32 overflow-hidden">
        {/* Borders */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10"></div>
        <div className="absolute left-0 bottom-0 right-0 h-px bg-white/10"></div>

        {/* Left Vertical Text */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center z-10 hidden lg:block">
          <div className="flex flex-col items-center gap-2">
            <span className="text-white font-medium text-sm tracking-wider">
              {isRegister ? "REGISTRO" : "INICIO SESIÓN"}
            </span>
            <div className="w-12 h-px bg-white"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-[90%] max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 lg:gap-20 xl:gap-24 items-center relative z-10">
          {/* Left Side - Preview and Info */}
          <div className="flex flex-col items-start space-y-10 md:space-y-12 w-full">
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
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white relative min-h-[110px] md:min-h-[130px] lg:min-h-[150px] flex items-start pt-2">
              <div 
                className="absolute top-0 left-0 right-0 transition-all duration-500 ease-in-out"
                style={{
                  opacity: isRegister ? 0 : 1,
                  transform: isRegister ? 'translateY(-20px)' : 'translateY(0)',
                  pointerEvents: isRegister ? 'none' : 'auto',
                  visibility: isRegister ? 'hidden' : 'visible'
                }}
              >
                Bienvenido de vuelta
              </div>
              <div 
                className="absolute top-0 left-0 right-0 transition-all duration-500 ease-in-out"
                style={{
                  opacity: isRegister ? 1 : 0,
                  transform: isRegister ? 'translateY(0)' : 'translateY(20px)',
                  pointerEvents: isRegister ? 'auto' : 'none',
                  visibility: isRegister ? 'visible' : 'hidden'
                }}
              >
                Únete a Chatify
              </div>
            </div>

            {/* Description */}
            <div className="w-full max-w-xl relative min-h-[150px] md:min-h-[170px] flex items-start pt-6">
              <div 
                className="flex items-start gap-4 transition-all duration-500 ease-in-out absolute top-0 left-0 right-0"
                style={{
                  opacity: isRegister ? 0 : 1,
                  transform: isRegister ? 'translateY(-20px)' : 'translateY(0)',
                  pointerEvents: isRegister ? 'none' : 'auto',
                  visibility: isRegister ? 'hidden' : 'visible'
                }}
              >
                <Quote className="h-6 w-6 text-white flex-shrink-0 mt-1" />
                <p className="text-white/70 text-lg md:text-xl leading-relaxed">
                  Accede a tu cuenta y continúa donde lo dejaste.<br />
                  Tu equipo te está esperando.
                </p>
              </div>
              <div 
                className="flex items-start gap-4 transition-all duration-500 ease-in-out absolute top-0 left-0 right-0"
                style={{
                  opacity: isRegister ? 1 : 0,
                  transform: isRegister ? 'translateY(0)' : 'translateY(20px)',
                  pointerEvents: isRegister ? 'auto' : 'none',
                  visibility: isRegister ? 'visible' : 'hidden'
                }}
              >
                <Quote className="h-6 w-6 text-white flex-shrink-0 mt-1" />
                <p className="text-white/70 text-lg md:text-xl leading-relaxed">
                  Crea tu cuenta y comienza a comunicarte con tu equipo de forma instantánea.<br />
                  Únete a miles de usuarios que ya confían en Chatify.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white/5 rounded-2xl p-8 md:p-10 border border-white/10 backdrop-blur-sm">
              {/* Toggle between Login and Register */}
              <div className="flex gap-4 mb-10 relative border-b border-white/10">
                <div 
                  className="absolute bottom-0 h-0.5 bg-white transition-all duration-500 ease-in-out"
                  style={{
                    left: isRegister ? '50%' : '0%',
                    width: '50%'
                  }}
                />
                <button
                  onClick={() => setIsRegister(false)}
                  className={`flex-1 py-3 text-center font-medium transition-all duration-500 ${
                    !isRegister
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => setIsRegister(true)}
                  className={`flex-1 py-3 text-center font-medium transition-all duration-500 ${
                    isRegister
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Registrarse
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="overflow-hidden relative">
                  <div 
                    className="transition-all duration-500 ease-in-out"
                    style={{
                      transform: isRegister ? 'translateX(0) translateY(0)' : 'translateX(-100%) translateY(-20px)',
                      opacity: isRegister ? 1 : 0,
                      maxHeight: isRegister ? '200px' : '0',
                      marginTop: isRegister ? '0' : '-24px',
                      pointerEvents: isRegister ? 'auto' : 'none'
                    }}
                  >
                    <div>
                      <label className="block text-base font-medium text-white/80 mb-3">
                        Nombre completo
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Tu nombre"
                          required={isRegister}
                          className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors text-base"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="transition-all duration-500 ease-in-out">
                  <label className="block text-base font-medium text-white/80 mb-3">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors text-base"
                    />
                  </div>
                </div>

                <div className="transition-all duration-500 ease-in-out">
                  <label className="block text-base font-medium text-white/80 mb-3">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors text-base"
                    />
                  </div>
                </div>

                <div className="overflow-hidden relative">
                  <div 
                    className="transition-all duration-500 ease-in-out"
                    style={{
                      transform: isRegister ? 'translateX(0) translateY(0)' : 'translateX(100%) translateY(-20px)',
                      opacity: isRegister ? 1 : 0,
                      maxHeight: isRegister ? '200px' : '0',
                      marginTop: isRegister ? '0' : '-24px',
                      pointerEvents: isRegister ? 'auto' : 'none'
                    }}
                  >
                    <div>
                      <label className="block text-base font-medium text-white/80 mb-3">
                        Confirmar contraseña
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="••••••••"
                          required={isRegister}
                          className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors text-base"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden relative">
                  <div 
                    className="transition-all duration-500 ease-in-out"
                    style={{
                      transform: !isRegister ? 'translateX(0) translateY(0)' : 'translateX(-100%) translateY(-20px)',
                      opacity: !isRegister ? 1 : 0,
                      maxHeight: !isRegister ? '120px' : '0',
                      marginTop: !isRegister ? '0' : '-32px',
                      pointerEvents: !isRegister ? 'auto' : 'none'
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded bg-white/5 border-white/20 text-white focus:ring-white/20"
                        />
                        <span className="text-base text-white/60">Recordarme</span>
                      </label>
                      <a href="#" className="text-base text-white/60 hover:text-white transition-colors sm:ml-8">
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSigningUp || isLoginIn}
                  className="w-full px-8 py-3 border-2 border-white text-white font-medium hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2 rounded-full"
                >
                  {isRegister ? "CREAR CUENTA" : "INICIAR SESIÓN"}
                  <ArrowRight className="h-5 w-5" />
                </button>

                {!isRegister && (
                  <div className="text-center pt-6">
                    <p className="text-white/60 text-base">
                      ¿No tienes una cuenta?{" "}
                      <button
                        type="button"
                        onClick={() => setIsRegister(true)}
                        className="text-white hover:underline font-medium"
                      >
                        Regístrate aquí
                      </button>
                    </p>
                  </div>
                )}

                {isRegister && (
                  <div className="text-center pt-6">
                    <p className="text-white/60 text-base">
                      ¿Ya tienes una cuenta?{" "}
                      <button
                        type="button"
                        onClick={() => setIsRegister(false)}
                        className="text-white hover:underline font-medium"
                      >
                        Inicia sesión aquí
                      </button>
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

