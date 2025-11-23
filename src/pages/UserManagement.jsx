import React, { useState } from 'react';
import Logo from '../components/Logo';
import { Home, FileText, AlertTriangle, Settings, User, Bell, Search, BarChart3, Users, Edit, Trash2, Plus, X, Mail, Shield } from 'lucide-react';

export default function UserManagement() {
  const [addUserModal, setAddUserModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const userData = [
    { id: 1, nom: 'Mohammed Alami', email: 'malami@genericlab.com', role: 'Responsable Qualité', departement: 'Qualité', statut: 'Actif', dateCreation: '01/10/2020' },
    { id: 2, nom: 'Fatima Zahra', email: 'fzahra@genericlab.com', role: 'Auditeur', departement: 'Qualité', statut: 'Actif', dateCreation: '15/03/2021' },
    { id: 3, nom: 'Karim Mansouri', email: 'kmansouri@genericlab.com', role: 'Superviseur', departement: 'Production', statut: 'Actif', dateCreation: '20/06/2021' },
    { id: 4, nom: 'Amina Berrada', email: 'aberrada@genericlab.com', role: 'Administrateur', departement: 'IT', statut: 'Actif', dateCreation: '10/01/2022' },
    { id: 5, nom: 'Youssef Alami', email: 'yalami@genericlab.com', role: 'Technicien', departement: 'Maintenance', statut: 'Actif', dateCreation: '05/08/2022' },
    { id: 6, nom: 'Sara Idrissi', email: 'sidrissi@genericlab.com', role: 'Formateur', departement: 'RH', statut: 'Inactif', dateCreation: '12/02/2023' },
  ];

  const getRoleColor = (role) => {
    const colors = {
      'Administrateur': 'bg-purple-100 text-purple-700',
      'Responsable Qualité': 'bg-blue-100 text-blue-700',
      'Auditeur': 'bg-teal-100 text-teal-700',
      'Superviseur': 'bg-orange-100 text-orange-700',
      'Technicien': 'bg-gray-100 text-gray-700',
      'Formateur': 'bg-green-100 text-green-700',
    };
    return colors[role] || 'bg-gray-100 text-gray-700';
  };

  const getStatusColor = (status) => {
    return status === 'Actif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
  };

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
              <span className="font-medium">Gestion de CAPA</span>
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
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-4">Administration</p>
            <div className="space-y-1">
              <button type="button" className="flex items-center space-x-3 px-4 py-3 rounded-xl" style={{ backgroundColor: '#E3F2FD', color: '#0066CC' }}>
                <Users className="w-5 h-5" />
                <span className="font-medium">Gestion Utilisateurs</span>
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
            <p className="text-sm text-gray-500 mb-1">Pages / Gestion Utilisateurs</p>
            <h2 className="text-xl font-bold text-gray-800">Gestion des Utilisateurs</h2>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un utilisateur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
        <main className="flex-1 overflow-y-auto p-8" style={{ backgroundColor: '#F8F9FA' }}>
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#E3F2FD' }}>
                  <Users className="w-7 h-7" style={{ color: '#0066CC' }} />
                </div>
              </div>
              <p className="text-sm text-gray-500 font-medium mb-1">Total Utilisateurs</p>
              <p className="text-2xl font-bold text-gray-800 mb-1">24</p>
              <p className="text-xs text-gray-400">+3 ce mois</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#E8F5E9' }}>
                  <User className="w-7 h-7" style={{ color: '#4CAF50' }} />
                </div>
              </div>
              <p className="text-sm text-gray-500 font-medium mb-1">Utilisateurs Actifs</p>
              <p className="text-2xl font-bold text-gray-800 mb-1">21</p>
              <p className="text-xs text-gray-400">87.5%</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#FFF3E0' }}>
                  <Shield className="w-7 h-7" style={{ color: '#FF9800' }} />
                </div>
              </div>
              <p className="text-sm text-gray-500 font-medium mb-1">Administrateurs</p>
              <p className="text-2xl font-bold text-gray-800 mb-1">4</p>
              <p className="text-xs text-gray-400">Accès complet</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#E0F7FA' }}>
                  <Mail className="w-7 h-7" style={{ color: '#00BCD4' }} />
                </div>
              </div>
              <p className="text-sm text-gray-500 font-medium mb-1">Invitations</p>
              <p className="text-2xl font-bold text-gray-800 mb-1">5</p>
              <p className="text-xs text-gray-400">En attente</p>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="px-8 py-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Liste des Utilisateurs</h3>
                  <p className="text-sm text-gray-500 mt-1">Gérer les accès et permissions des utilisateurs</p>
                </div>
                <button
                  onClick={() => setAddUserModal(true)}
                  className="flex items-center space-x-2 px-5 py-2.5 text-sm font-semibold rounded-xl text-white transition-all hover:shadow-lg"
                  style={{ backgroundColor: '#0066CC' }}
                >
                  <Plus className="w-4 h-4" />
                  <span>NOUVEL UTILISATEUR</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-8 py-4 text-left">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Utilisateur</span>
                    </th>
                    <th className="px-8 py-4 text-left">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Rôle</span>
                    </th>
                    <th className="px-8 py-4 text-left">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Département</span>
                    </th>
                    <th className="px-8 py-4 text-left">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Statut</span>
                    </th>
                    <th className="px-8 py-4 text-left">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Date de création</span>
                    </th>
                    <th className="px-8 py-4 text-left">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user) => (
                    <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold" style={{ backgroundColor: '#0066CC' }}>
                            {user.nom.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-800">{user.nom}</div>
                            <div className="text-xs text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm text-gray-700">{user.departement}</span>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${getStatusColor(user.statut)}`}>
                          {user.statut}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm text-gray-500">{user.dateCreation}</span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors" style={{ color: '#0066CC' }}>
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-8 py-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-500">Affichage de 1 à 6 sur 24 entrées</p>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Précédent</button>
                <button className="px-3 py-1.5 text-sm font-medium text-white rounded-lg" style={{ backgroundColor: '#0066CC' }}>1</button>
                <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">2</button>
                <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">3</button>
                <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Suivant</button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal Ajout Utilisateur */}
      {addUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">Ajouter un nouvel utilisateur</h3>
              <button
                onClick={() => setAddUserModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-8">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-2">NOM COMPLET</label>
                    <input
                      type="text"
                      placeholder="Ex: Mohammed Alami"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-2">EMAIL</label>
                    <input
                      type="email"
                      placeholder="Ex: malami@genericlab.com"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-2">RÔLE</label>
                    <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-300">
                      <option>Sélectionner un rôle</option>
                      <option>Administrateur</option>
                      <option>Responsable Qualité</option>
                      <option>Auditeur</option>
                      <option>Superviseur</option>
                      <option>Technicien</option>
                      <option>Formateur</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-2">DÉPARTEMENT</label>
                    <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-300">
                      <option>Sélectionner un département</option>
                      <option>Production</option>
                      <option>Qualité</option>
                      <option>QA</option>
                      <option>Maintenance</option>
                      <option>Documentation</option>
                      <option>RH</option>
                      <option>IT</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-2">MOT DE PASSE TEMPORAIRE</label>
                  <input
                    type="password"
                    placeholder="Générer automatiquement"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-300"
                  />
                  <p className="text-xs text-gray-500 mt-2">L'utilisateur recevra un email pour réinitialiser son mot de passe</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 mt-8">
                <button
                  onClick={() => setAddUserModal(false)}
                  className="flex-1 px-5 py-2.5 text-sm font-semibold rounded-xl text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  ANNULER
                </button>
                <button
                  className="flex-1 px-5 py-2.5 text-sm font-semibold rounded-xl text-white transition-all hover:shadow-lg"
                  style={{ backgroundColor: '#0066CC' }}
                >
                  CRÉER L'UTILISATEUR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
