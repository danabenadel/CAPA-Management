import React, { useState } from 'react';
import Logo from '../components/Logo';
import { Eye, EyeOff, Home, FileText, LogIn, UserPlus } from 'lucide-react';

export default function GenericlabSignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <nav className="px-8 py-6 flex items-center justify-between border-b border-gray-100 bg-white">
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
          <button type="button" className="flex items-center space-x-2 font-medium" style={{ color: '#0066CC' }}>
            <UserPlus className="w-4 h-4" />
            <span className="text-sm">Sign Up</span>
          </button>
          <button type="button" className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
            <LogIn className="w-4 h-4" />
            <span className="text-sm font-medium">Sign In</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Side - Gradient Background */}
        <div className="hidden lg:flex lg:w-2/5 items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #4FC3F7 0%, #00BCD4 100%)' }}>
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
              <svg width="120" height="120" viewBox="0 0 200 200" fill="none">
                <circle cx="60" cy="100" r="50" fill="white" opacity="0.9"/>
                <path d="M110 50 Q150 50 170 80 Q190 110 170 140 Q150 170 110 170" stroke="white" strokeWidth="20" fill="none" opacity="0.9"/>
              </svg>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-4">Bienvenue!</h2>
            <p className="text-lg text-white text-opacity-90 max-w-md mx-auto leading-relaxed mb-8">
              Utilisez ces formulaires pour créer votre compte et accéder gratuitement à la plateforme CAPA
            </p>

            {/* Social Register Buttons */}
            <div className="space-y-3 max-w-xs mx-auto">
              <p className="text-white text-sm font-semibold mb-4">S'inscrire avec</p>
              
              <button className="w-full flex items-center justify-center space-x-3 bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 px-6 py-3 rounded-xl transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-white font-medium">Google</span>
              </button>

              <button className="w-full flex items-center justify-center space-x-3 bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 px-6 py-3 rounded-xl transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                  <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>
                </svg>
                <span className="text-white font-medium">Facebook</span>
              </button>

              <button className="w-full flex items-center justify-center space-x-3 bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 px-6 py-3 rounded-xl transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10Z"/>
                </svg>
                <span className="text-white font-medium">Github</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-3/5 flex items-center justify-center px-8 py-12" style={{ backgroundColor: '#F8F9FA' }}>
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-gray-100 p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2" style={{ color: '#0066CC' }}>S'inscrire</h2>
              <p className="text-gray-600">Créez votre compte Genericlab CAPA</p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nom complet</label>
                <input
                  type="text"
                  placeholder="Votre nom complet"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="votre.email@genericlab.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Département</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all">
                    <option value="">Sélectionner</option>
                    <option>Production</option>
                    <option>Qualité</option>
                    <option>QA/QC</option>
                    <option>R&D</option>
                    <option>Maintenance</option>
                    <option>Documentation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Rôle</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all">
                    <option value="">Sélectionner</option>
                    <option>Responsable Qualité</option>
                    <option>Superviseur</option>
                    <option>Auditeur</option>
                    <option>Technicien</option>
                    <option>Administrateur</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mot de passe</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimum 8 caractères"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-400"></div>
                  </div>
                  <span className="ml-3 text-sm text-gray-700">
                    J'accepte les{' '}
                    <button type="button" className="font-semibold hover:underline" style={{ color: '#0066CC' }}>
                      conditions d'utilisation
                    </button>
                  </span>
                </label>
              </div>

              <button 
                className="w-full py-3 px-4 text-white font-semibold rounded-xl transition-all hover:shadow-lg"
                style={{ backgroundColor: '#0066CC' }}
              >
                S'INSCRIRE
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Vous avez déjà un compte?{' '}
                  <button type="button" className="font-semibold hover:underline" style={{ color: '#0066CC' }}>
                    Se connecter
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 py-6 border-t border-gray-100 bg-white">
        <p className="text-center text-sm text-gray-500">
          © 2025, Made with ❤️ by Genericlab - Tous droits réservés
        </p>
      </div>
    </div>
  );
}

