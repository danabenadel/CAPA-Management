import React, { useState } from 'react';
import Logo from '../components/Logo';
import { Eye, EyeOff, Home, FileText, User, LogIn } from 'lucide-react';

export default function GenericlabSignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Top Navigation */}
        <nav className="px-8 py-6 flex items-center justify-between border-b border-gray-100">
          <Logo />

          <div className="hidden md:flex items-center space-x-6">
            <button type="button" className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Dashboard</span>
            </button>
            <button type="button" className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">Profile</span>
            </button>
            <button type="button" className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">Sign Up</span>
            </button>
            <button type="button" className="flex items-center space-x-2 font-medium" style={{ color: '#0066CC' }}>
              <LogIn className="w-4 h-4" />
              <span className="text-sm">Sign In</span>
            </button>
          </div>
        </nav>

        {/* Sign In Form */}
        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2" style={{ color: '#0066CC' }}>Bienvenue</h2>
              <p className="text-gray-600">Entrez votre email et mot de passe pour vous connecter</p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                  style={{ focusRing: '#0066CC' }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mot de passe</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Votre mot de passe"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all pr-12"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-400"></div>
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-700">Se souvenir de moi</span>
                </label>
              </div>

              <button 
                className="w-full py-3 px-4 text-white font-semibold rounded-xl transition-all hover:shadow-lg"
                style={{ backgroundColor: '#0066CC' }}
              >
                SE CONNECTER
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Vous n'avez pas de compte?{' '}
                  <button type="button" className="font-semibold hover:underline" style={{ color: '#0066CC' }}>
                    S'inscrire
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-gray-100">
          <p className="text-center text-sm text-gray-500">
            © 2025, Made with ❤️ by Genericlab - Tous droits réservés
          </p>
        </div>
      </div>

      {/* Right Side - Gradient Background */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #4FC3F7 0%, #00BCD4 100%)' }}>
        {/* Decorative Wave Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1000 1000">
            <path d="M0,300 Q250,400 500,300 T1000,300 L1000,1000 L0,1000 Z" fill="white"/>
            <path d="M0,500 Q250,600 500,500 T1000,500 L1000,1000 L0,1000 Z" fill="white"/>
            <path d="M0,700 Q250,800 500,700 T1000,700 L1000,1000 L0,1000 Z" fill="white"/>
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-12">
          <div className="flex justify-center mb-8">
            <svg width="150" height="150" viewBox="0 0 200 200" fill="none">
              <circle cx="60" cy="100" r="50" fill="white" opacity="0.9"/>
              <path d="M110 50 Q150 50 170 80 Q190 110 170 140 Q150 170 110 170" stroke="white" strokeWidth="20" fill="none" opacity="0.9"/>
            </svg>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4">Genericlab</h2>
          <h3 className="text-2xl font-semibold text-white text-opacity-90 mb-6">CAPA Management System</h3>
          <p className="text-lg text-white text-opacity-80 max-w-md mx-auto leading-relaxed">
            Gestion complète des actions correctives et préventives pour l'industrie pharmaceutique
          </p>

          {/* Feature Pills */}
          <div className="mt-12 space-y-3">
            <div className="inline-flex items-center space-x-3 bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4" style={{ color: '#0066CC' }} />
              </div>
              <span className="text-white font-medium">Suivi en temps réel</span>
            </div>
            <div className="block"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

