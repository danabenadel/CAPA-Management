import React, { useState } from 'react';
import Logo from '../components/Logo';
import { Home, FileText, AlertTriangle, CheckCircle, Settings, User, Bell, Search, BarChart3, MapPin, Calendar, Edit, Save, TrendingUp } from 'lucide-react';

export default function GenericlabProfileScreen() {
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('apercu');

  const capaHistory = [
    { id: 'CAPA-2025-024', action: 'Création', date: '15/10/2025 14:30', utilisateur: 'Mohammed Alami', details: 'CAPA créée pour déviation température' },
    { id: 'CAPA-2025-024', action: 'Mise à jour', date: '16/10/2025 09:15', utilisateur: 'Mohammed Alami', details: 'Ajout de l\'analyse de cause racine' },
    { id: 'CAPA-2025-023', action: 'Validation', date: '14/10/2025 16:45', utilisateur: 'Mohammed Alami', details: 'Validation des actions correctives' },
    { id: 'CAPA-2025-022', action: 'Commentaire', date: '13/10/2025 11:20', utilisateur: 'Mohammed Alami', details: 'Commentaire ajouté sur le plan d\'action' },
    { id: 'CAPA-2025-021', action: 'Clôture', date: '12/10/2025 15:00', utilisateur: 'Mohammed Alami', details: 'CAPA clôturée après vérification d\'efficacité' },
    { id: 'CAPA-2025-020', action: 'Assignation', date: '11/10/2025 10:30', utilisateur: 'Mohammed Alami', details: 'CAPA assignée à l\'équipe maintenance' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <Logo />

        <nav className="flex-1 py-6 px-4">
          <div className="space-y-1 mb-6">
            <button type="button" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
              <Home className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </button>
            <button type="button" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
              <FileText className="w-5 h-5" />
              <span className="font-medium">Tables</span>
            </button>
            <button type="button" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">Déviations</span>
            </button>
            <button type="button" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium">Rapports</span>
            </button>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-4">Account Pages</p>
            <div className="space-y-1">
              <button type="button" className="flex items-center space-x-3 px-4 py-3 rounded-xl" style={{ backgroundColor: '#E3F2FD', color: '#0066CC' }}>
                <User className="w-5 h-5" />
                <span className="font-medium">Profile</span>
              </button>
              <button type="button" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                <Settings className="w-5 h-5" />
                <span className="font-medium">Paramètres</span>
              </button>
            </div>
          </div>
        </nav>

        <div className="mx-4 mb-6 p-5 rounded-2xl" style={{ background: 'linear-gradient(135deg, #4FC3F7 0%, #00BCD4 100%)' }}>
          <div className="w-12 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center mb-3">
            <span className="text-2xl">❓</span>
          </div>
          <h3 className="text-white font-bold text-base mb-1">Besoin d'aide?</h3>
          <p className="text-white text-sm opacity-90 mb-4">Consultez notre documentation</p>
          <button className="w-full bg-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-all hover:shadow-lg" style={{ color: '#00BCD4' }}>
            DOCUMENTATION
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8">
          <div>
            <p className="text-sm text-gray-500 mb-1">Pages / Profile</p>
            <h2 className="text-xl font-bold text-gray-800">Profile</h2>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Type here..."
                className="w-64 pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-300 transition-colors"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            </div>
            
            <button className="p-2.5 hover:bg-gray-50 rounded-xl transition-colors">
              <User className="w-5 h-5 text-gray-600" />
            </button>
            
            <button className="p-2.5 hover:bg-gray-50 rounded-xl transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            
            <button className="p-2.5 hover:bg-gray-50 rounded-xl transition-colors relative">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            
            <button className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
              Sign In
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto" style={{ backgroundColor: '#F8F9FA' }}>
          {/* Header Profile avec gradient turquoise */}
          <div className="h-64 relative" style={{ background: 'linear-gradient(135deg, #4FC3F7 0%, #00BCD4 100%)' }}>
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 1000 300">
                <path d="M0,100 Q250,150 500,100 T1000,100 L1000,300 L0,300 Z" fill="white"/>
              </svg>
            </div>
            <div className="absolute top-4 left-8 text-white">
              <p className="text-sm opacity-90 mb-1">Pages / Profile</p>
              <h2 className="text-2xl font-bold">Profile</h2>
            </div>
          </div>

          <div className="px-8 -mt-32 pb-8">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-white text-3xl font-bold" style={{ backgroundColor: '#0066CC' }}>
                      MA
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-lg shadow-lg flex items-center justify-center border-2 border-gray-100">
                      <Edit className="w-4 h-4" style={{ color: '#0066CC' }} />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">Mohammed Alami</h3>
                    <p className="text-gray-600 mb-2">Responsable Qualité / Quality Manager</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>Alger, Algérie</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Employé depuis Oct 2020</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setEditMode(!editMode)}
                  className="px-5 py-2.5 text-sm font-semibold rounded-xl text-white transition-all hover:shadow-lg flex items-center space-x-2" 
                  style={{ backgroundColor: '#0066CC' }}
                >
                  {editMode ? (
                    <>
                      <Save className="w-4 h-4" />
                      <span>SAUVEGARDER</span>
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4" />
                      <span>MODIFIER</span>
                    </>
                  )}
                </button>
              </div>

              {/* Tabs */}
              <div className="flex items-center space-x-8 mt-8 border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('apercu')}
                  className="pb-4 border-b-2 font-semibold text-sm"
                  style={{
                    borderColor: activeTab === 'apercu' ? '#0066CC' : 'transparent',
                    color: activeTab === 'apercu' ? '#0066CC' : '#6B7280'
                  }}
                >
                  APERÇU
                </button>
                <button
                  onClick={() => setActiveTab('capa')}
                  className="pb-4 border-b-2 font-semibold text-sm hover:text-gray-700"
                  style={{
                    borderColor: activeTab === 'capa' ? '#0066CC' : 'transparent',
                    color: activeTab === 'capa' ? '#0066CC' : '#6B7280'
                  }}
                >
                  CAPA ASSIGNÉES
                </button>
                <button
                  onClick={() => setActiveTab('historique')}
                  className="pb-4 border-b-2 font-semibold text-sm hover:text-gray-700"
                  style={{
                    borderColor: activeTab === 'historique' ? '#0066CC' : 'transparent',
                    color: activeTab === 'historique' ? '#0066CC' : '#6B7280'
                  }}
                >
                  HISTORIQUE
                </button>
              </div>
            </div>

            {/* Contenu selon l'onglet actif */}
            {activeTab === 'apercu' && (
            <div className="grid grid-cols-3 gap-6">
              {/* Platform Settings */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h4 className="text-lg font-bold text-gray-800 mb-6">Paramètres Plateforme</h4>
                
                <div className="space-y-4">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">COMPTE</div>
                  
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-gray-700">Email notifications</span>
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-400"></div>
                    </div>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-gray-700">Notifications CAPA urgentes</span>
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-400"></div>
                    </div>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-gray-700">Rappels échéances</span>
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-400"></div>
                    </div>
                  </label>

                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 mt-6">APPLICATION</div>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-gray-700">Rapports hebdomadaires</span>
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-400"></div>
                    </div>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-gray-700">Analyses mensuelles</span>
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-400"></div>
                    </div>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-gray-700">Alertes système</span>
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-400"></div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Profile Information */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-bold text-gray-800">Informations du Profil</h4>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-2">NOM COMPLET</label>
                      <input 
                        type="text" 
                        defaultValue="Mohammed Alami"
                        disabled={!editMode}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-300 disabled:opacity-60"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-2">MOBILE</label>
                      <input 
                        type="text" 
                        defaultValue="+213 6 12 34 56 78"
                        disabled={!editMode}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-300 disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-2">EMAIL</label>
                    <input 
                      type="email" 
                      defaultValue="malami@genericlab.com"
                      disabled={!editMode}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-300 disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-2">LOCALISATION</label>
                    <input 
                      type="text" 
                      defaultValue="Alger, Algérie"
                      disabled={!editMode}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-300 disabled:opacity-60"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-2">DÉPARTEMENT</label>
                      <input 
                        type="text" 
                        defaultValue="Assurance Qualité"
                        disabled={!editMode}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-300 disabled:opacity-60"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-2">RÔLE</label>
                      <select 
                        disabled={!editMode}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-300 disabled:opacity-60"
                      >
                        <option>Responsable Qualité</option>
                        <option>Superviseur</option>
                        <option>Auditeur</option>
                        <option>Administrateur</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* CAPA Stats */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 col-span-3 mt-6">
                <h4 className="text-lg font-bold text-gray-800 mb-6">Statistiques CAPA</h4>
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#E3F2FD' }}>
                        <FileText className="w-7 h-7" style={{ color: '#0066CC' }} />
                      </div>
                      <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+3</span>
                    </div>
                    <h3 className="text-sm text-gray-500 font-medium mb-1">CAPA Assignées</h3>
                    <p className="text-3xl font-bold text-gray-800">12</p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#E8F5E9' }}>
                        <CheckCircle className="w-7 h-7" style={{ color: '#4CAF50' }} />
                      </div>
                      <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+8</span>
                    </div>
                    <h3 className="text-sm text-gray-500 font-medium mb-1">CAPA Complétées</h3>
                    <p className="text-3xl font-bold text-gray-800">45</p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#E0F7FA' }}>
                        <TrendingUp className="w-7 h-7" style={{ color: '#00BCD4' }} />
                      </div>
                      <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">98%</span>
                    </div>
                    <h3 className="text-sm text-gray-500 font-medium mb-1">Taux de Réussite</h3>
                    <p className="text-3xl font-bold text-gray-800">96%</p>
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* Onglet HISTORIQUE */}
            {activeTab === 'historique' && (
              <div className="mt-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="px-8 py-6 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800">Historique des Actions CAPA</h3>
                    <p className="text-sm text-gray-500 mt-1">Toutes les actions effectuées sur les CAPA</p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                          <th className="px-8 py-4 text-left">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">ID CAPA</span>
                          </th>
                          <th className="px-8 py-4 text-left">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Action</span>
                          </th>
                          <th className="px-8 py-4 text-left">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Date & Heure</span>
                          </th>
                          <th className="px-8 py-4 text-left">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Utilisateur</span>
                          </th>
                          <th className="px-8 py-4 text-left">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Détails</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {capaHistory.map((entry, index) => (
                          <tr key={index} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="px-8 py-5">
                              <span className="text-sm font-bold" style={{ color: '#0066CC' }}>{entry.id}</span>
                            </td>
                            <td className="px-8 py-5">
                              <span className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${
                                entry.action === 'Création' ? 'bg-blue-100 text-blue-700' :
                                entry.action === 'Validation' ? 'bg-green-100 text-green-700' :
                                entry.action === 'Clôture' ? 'bg-purple-100 text-purple-700' :
                                entry.action === 'Mise à jour' ? 'bg-orange-100 text-orange-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {entry.action}
                              </span>
                            </td>
                            <td className="px-8 py-5">
                              <span className="text-sm text-gray-700">{entry.date}</span>
                            </td>
                            <td className="px-8 py-5">
                              <span className="text-sm text-gray-700">{entry.utilisateur}</span>
                            </td>
                            <td className="px-8 py-5">
                              <span className="text-sm text-gray-600">{entry.details}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="px-8 py-4 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-sm text-gray-500">Affichage de 1 à 6 sur 6 entrées</p>
                  </div>
                </div>
              </div>
            )}

            {/* Onglet CAPA ASSIGNÉES */}
            {activeTab === 'capa' && (
              <div className="mt-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">CAPA Assignées</h3>
                  <p className="text-sm text-gray-500">Toutes les CAPA qui vous sont assignées apparaîtront ici.</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

