import React, { useState } from 'react';
import Logo from '../components/Logo';
import { Home, FileText, AlertTriangle, CheckCircle, Settings, User, Bell, Search, BarChart3, Filter, Edit, Trash2, Eye, Download, ChevronDown, FileSearch, History, X, Calendar } from 'lucide-react';

export default function GenericlabTablesScreen() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [investigationModal, setInvestigationModal] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [selectedCapa, setSelectedCapa] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDetailTab, setActiveDetailTab] = useState('details');

  const capaData = [
    { id: 'CAPA-2025-024', titre: 'Déviation température chambre froide', type: 'Corrective', priorite: 'Haute', statut: 'En cours', responsable: 'Mohammed Benali', email: 'mbenali@genericlab.com', date: '15/10/2025', departement: 'Production' },
    { id: 'CAPA-2025-023', titre: 'Non-conformité étiquetage lot #45782', type: 'Corrective', priorite: 'Critique', statut: 'Analyse', responsable: 'Fatima Zahra', email: 'fzahra@genericlab.com', date: '12/10/2025', departement: 'Qualité' },
    { id: 'CAPA-2025-022', titre: 'Amélioration processus nettoyage', type: 'Préventive', priorite: 'Moyenne', statut: 'Planifiée', responsable: 'Karim Mansouri', email: 'kmansouri@genericlab.com', date: '10/10/2025', departement: 'QA' },
    { id: 'CAPA-2025-021', titre: 'Révision SOP fabrication', type: 'Préventive', priorite: 'Basse', statut: 'Validation', responsable: 'Amina Berrada', email: 'aberrada@genericlab.com', date: '08/10/2025', departement: 'Documentation' },
    { id: 'CAPA-2025-020', titre: 'Défaillance équipement tablettage', type: 'Corrective', priorite: 'Haute', statut: 'En cours', responsable: 'Youssef Alami', email: 'yalami@genericlab.com', date: '05/10/2025', departement: 'Maintenance' },
    { id: 'CAPA-2025-019', titre: 'Formation BPF personnel production', type: 'Préventive', priorite: 'Moyenne', statut: 'Planifiée', responsable: 'Sara Idrissi', email: 'sidrissi@genericlab.com', date: '02/10/2025', departement: 'RH/Formation' },
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      'Critique': 'bg-red-100 text-red-700',
      'Haute': 'bg-orange-100 text-orange-700',
      'Moyenne': 'bg-yellow-100 text-yellow-700',
      'Basse': 'bg-green-100 text-green-700'
    };
    return colors[priority] || 'bg-gray-100 text-gray-700';
  };

  const getStatusColor = (status) => {
    const colors = {
      'En cours': 'bg-blue-100 text-blue-700',
      'Analyse': 'bg-purple-100 text-purple-700',
      'Planifiée': 'bg-indigo-100 text-indigo-700',
      'Validation': 'bg-teal-100 text-teal-700',
      'Clôturée': 'bg-green-100 text-green-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
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
            <button type="button" className="flex items-center space-x-3 px-4 py-3 rounded-xl" style={{ backgroundColor: '#E3F2FD', color: '#0066CC' }}>
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
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-4">Account Pages</p>
            <div className="space-y-1">
              <button type="button" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
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
            <p className="text-sm text-gray-500 mb-1">Pages / Gestion de CAPA</p>
            <h2 className="text-xl font-bold text-gray-800">Gestion de CAPA</h2>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher CAPA..."
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
          {/* Table Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="px-8 py-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Liste des CAPA</h3>
                  <p className="text-sm text-gray-500 mt-1">Gestion complète des actions correctives et préventives</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="flex items-center space-x-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm font-medium text-gray-700 transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                    <span>Filtrer</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm font-medium text-gray-700 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Exporter</span>
                  </button>
                  <button className="px-5 py-2.5 text-sm font-semibold rounded-xl text-white transition-all hover:shadow-lg" style={{ backgroundColor: '#0066CC' }}>
                    + NOUVELLE CAPA
                  </button>
                </div>
              </div>

              {/* Filter Panel */}
              {filterOpen && (
                <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">TYPE</label>
                    <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm">
                      <option>Tous</option>
                      <option>Corrective</option>
                      <option>Préventive</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">PRIORITÉ</label>
                    <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm">
                      <option>Toutes</option>
                      <option>Critique</option>
                      <option>Haute</option>
                      <option>Moyenne</option>
                      <option>Basse</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">STATUT</label>
                    <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm">
                      <option>Tous</option>
                      <option>En cours</option>
                      <option>Analyse</option>
                      <option>Planifiée</option>
                      <option>Validation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">DÉPARTEMENT</label>
                    <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm">
                      <option>Tous</option>
                      <option>Production</option>
                      <option>Qualité</option>
                      <option>QA</option>
                      <option>Maintenance</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-8 py-4 text-left">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">ID</span>
                    </th>
                    <th className="px-8 py-4 text-left">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Responsable</span>
                    </th>
                    <th className="px-8 py-4 text-left">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Type</span>
                    </th>
                    <th className="px-8 py-4 text-left">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Priorité</span>
                    </th>
                    <th className="px-8 py-4 text-left">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Statut</span>
                    </th>
                    <th className="px-8 py-4 text-left">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Due Date</span>
                    </th>
                    <th className="px-8 py-4 text-left">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {capaData.map((capa, index) => (
                    <tr key={index} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-5">
                        <div>
                          <div className="text-sm font-bold" style={{ color: '#0066CC' }}>{capa.id}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{capa.titre}</div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold" style={{ backgroundColor: '#0066CC' }}>
                            {capa.responsable.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-800">{capa.responsable}</div>
                            <div className="text-xs text-gray-500">{capa.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm text-gray-700">{capa.type}</span>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${getPriorityColor(capa.priorite)}`}>
                          {capa.priorite}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${getStatusColor(capa.statut)}`}>
                          {capa.statut}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm text-gray-500">{capa.date}</span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedCapa(capa);
                              setInvestigationModal(true);
                            }}
                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                            style={{ color: '#0066CC' }}
                            title="Investigation"
                          >
                            <FileSearch className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedCapa(capa);
                              setHistoryModal(true);
                            }}
                            className="p-2 hover:bg-purple-50 rounded-lg transition-colors text-purple-600"
                            title="Historique"
                          >
                            <History className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedCapa(capa);
                              setDetailsModal(true);
                              setActiveDetailTab('details');
                            }}
                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                            style={{ color: '#0066CC' }}
                            title="Détails"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
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

      {/* Modal Investigation */}
      {investigationModal && selectedCapa && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Investigation - {selectedCapa.id}</h3>
                <p className="text-sm text-gray-500 mt-1">{selectedCapa.titre}</p>
              </div>
              <button
                onClick={() => setInvestigationModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-8">
              {/* Hypothèses */}
              <div className="mb-8">
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <FileSearch className="w-5 h-5 mr-2" style={{ color: '#0066CC' }} />
                  Hypothèses
                </h4>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-semibold text-gray-800">Hypothèse 1: Défaillance du système de refroidissement</h5>
                      <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-orange-100 text-orange-700">En cours</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Le système de refroidissement pourrait avoir un dysfonctionnement intermittent causant les variations de température.</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <User className="w-4 h-4 mr-1" />
                      <span>Ajouté par Mohammed Benali le 15/10/2025</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-semibold text-gray-800">Hypothèse 2: Erreur de calibration du capteur</h5>
                      <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-green-100 text-green-700">Validée</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Les capteurs de température n'ont pas été calibrés depuis 6 mois, ce qui pourrait expliquer les lectures incorrectes.</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <User className="w-4 h-4 mr-1" />
                      <span>Ajouté par Fatima Zahra le 16/10/2025</span>
                    </div>
                  </div>
                </div>

                <button className="mt-4 px-4 py-2 text-sm font-semibold rounded-xl text-white transition-all hover:shadow-lg" style={{ backgroundColor: '#0066CC' }}>
                  + Ajouter une hypothèse
                </button>
              </div>

              {/* Actions */}
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" style={{ color: '#10B981' }} />
                  Actions Correctives
                </h4>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-semibold text-gray-800">Calibration des capteurs de température</h5>
                      <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-blue-100 text-blue-700">En cours</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Procéder à la calibration complète de tous les capteurs de température de la chambre froide.</p>
                    <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 mb-3">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span>Assigné à: Karim Mansouri</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Échéance: 20/10/2025</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-semibold text-gray-800">Maintenance préventive du système de refroidissement</h5>
                      <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-yellow-100 text-yellow-700">Planifiée</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Planifier une maintenance complète du système de refroidissement pour identifier tout dysfonctionnement.</p>
                    <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 mb-3">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span>Assigné à: Youssef Alami</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Échéance: 25/10/2025</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="mt-4 px-4 py-2 text-sm font-semibold rounded-xl text-white transition-all hover:shadow-lg" style={{ backgroundColor: '#10B981' }}>
                  + Ajouter une action
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Historique */}
      {historyModal && selectedCapa && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Historique - {selectedCapa.id}</h3>
                <p className="text-sm text-gray-500 mt-1">{selectedCapa.titre}</p>
              </div>
              <button
                onClick={() => setHistoryModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-8">
              <div className="relative">
                {/* Timeline */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                <div className="space-y-6">
                  {[
                    { action: 'Création', date: '15/10/2025 14:30', user: 'Mohammed Benali', details: 'CAPA créée suite à une déviation détectée', color: '#3B82F6' },
                    { action: 'Analyse', date: '15/10/2025 16:20', user: 'Fatima Zahra', details: 'Analyse de cause racine initiée', color: '#8B5CF6' },
                    { action: 'Hypothèse ajoutée', date: '16/10/2025 09:15', user: 'Mohammed Benali', details: 'Hypothèse 1: Défaillance du système de refroidissement', color: '#F59E0B' },
                    { action: 'Action planifiée', date: '16/10/2025 10:30', user: 'Karim Mansouri', details: 'Calibration des capteurs programmée', color: '#10B981' },
                    { action: 'Commentaire', date: '17/10/2025 11:45', user: 'Amina Berrada', details: 'Vérification de la documentation technique', color: '#6B7280' },
                    { action: 'Mise à jour', date: '18/10/2025 14:00', user: 'Mohammed Benali', details: 'Statut modifié: En cours', color: '#0066CC' },
                  ].map((entry, index) => (
                    <div key={index} className="relative pl-12">
                      <div
                        className="absolute left-0 w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: entry.color + '20' }}
                      >
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-semibold text-gray-800">{entry.action}</h5>
                          <span className="text-xs text-gray-500">{entry.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{entry.details}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <User className="w-3 h-3 mr-1" />
                          <span>{entry.user}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Détails Complet avec Tabs */}
      {detailsModal && selectedCapa && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{selectedCapa.id}</h3>
                  <p className="text-sm text-gray-500 mt-1">{selectedCapa.titre}</p>
                </div>
                <span className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${getPriorityColor(selectedCapa.priorite)}`}>
                  {selectedCapa.priorite}
                </span>
              </div>
              <button
                onClick={() => setDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 bg-gray-50 sticky top-[88px]">
              <div className="px-8 flex space-x-6">
                <button
                  onClick={() => setActiveDetailTab('details')}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeDetailTab === 'details'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Détails
                </button>
                <button
                  onClick={() => setActiveDetailTab('investigation')}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeDetailTab === 'investigation'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Investigation
                </button>
                <button
                  onClick={() => setActiveDetailTab('history')}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeDetailTab === 'history'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Historique
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {/* Tab: Détails */}
              {activeDetailTab === 'details' && (
                <div className="space-y-6">
                  {/* Informations générales */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-4">Informations Générales</h4>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Type</label>
                        <p className="text-sm text-gray-800 mt-1">{selectedCapa.type}</p>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Statut</label>
                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-lg mt-1 ${getStatusColor(selectedCapa.statut)}`}>
                          {selectedCapa.statut}
                        </span>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Responsable</label>
                        <p className="text-sm text-gray-800 mt-1">{selectedCapa.responsable}</p>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Département</label>
                        <p className="text-sm text-gray-800 mt-1">{selectedCapa.departement}</p>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Date de création</label>
                        <p className="text-sm text-gray-800 mt-1">{selectedCapa.date}</p>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Échéance</label>
                        <p className="text-sm text-gray-800 mt-1">25/10/2025</p>
                      </div>
                    </div>
                  </div>

                  {/* Analyse de cause racine */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-4">Analyse de Cause Racine</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Description du problème</label>
                        <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                          Une déviation de température a été détectée dans la chambre froide principale. La température est montée à 8°C alors que la plage acceptable est de 2-5°C. Cette déviation a duré environ 45 minutes avant d'être détectée par l'alarme automatique.
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Cause racine identifiée</label>
                        <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                          Après investigation, il a été déterminé que les capteurs de température n'avaient pas été calibrés depuis 6 mois, dépassant l'intervalle de calibration requis de 3 mois selon la procédure SOP-CAL-001. Les lectures incorrectes ont empêché la détection précoce de la défaillance.
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Impact</label>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-start space-x-2">
                            <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5" />
                            <p className="text-sm text-gray-700">3 lots de produits stockés dans la chambre froide affectés</p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5" />
                            <p className="text-sm text-gray-700">Risque de dégradation de la qualité des produits</p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5" />
                            <p className="text-sm text-gray-700">Investigation requise pour évaluer l'intégrité des lots</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Plan d'action correctif */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-4">Plan d'Action Correctif</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-blue-600">1</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-800">Calibration immédiate de tous les capteurs</p>
                          <p className="text-xs text-gray-600 mt-1">Échéance: 20/10/2025 • Assigné à: Karim Mansouri</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-blue-600">2</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-800">Évaluation de l'intégrité des lots affectés</p>
                          <p className="text-xs text-gray-600 mt-1">Échéance: 22/10/2025 • Assigné à: Fatima Zahra</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-blue-600">3</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-800">Maintenance préventive du système de refroidissement</p>
                          <p className="text-xs text-gray-600 mt-1">Échéance: 25/10/2025 • Assigné à: Youssef Alami</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mesures préventives */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-4">Mesures Préventives</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700">Mise en place d'un système de rappel automatique pour la calibration des capteurs (tous les 2 mois)</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700">Formation du personnel sur l'importance de la calibration régulière des équipements critiques</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700">Révision de la SOP-CAL-001 pour réduire l'intervalle de calibration de 3 à 2 mois</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700">Installation de capteurs de température redondants dans toutes les chambres froides critiques</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Investigation */}
              {activeDetailTab === 'investigation' && (
                <div className="space-y-8">
                  {/* Hypothèses */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <FileSearch className="w-5 h-5 mr-2" style={{ color: '#0066CC' }} />
                      Hypothèses
                    </h4>
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-semibold text-gray-800">Hypothèse 1: Défaillance du système de refroidissement</h5>
                          <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-orange-100 text-orange-700">En cours</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Le système de refroidissement pourrait avoir un dysfonctionnement intermittent causant les variations de température.</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <User className="w-4 h-4 mr-1" />
                          <span>Ajouté par Mohammed Benali le 15/10/2025</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-semibold text-gray-800">Hypothèse 2: Erreur de calibration du capteur</h5>
                          <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-green-100 text-green-700">Validée</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Les capteurs de température n'ont pas été calibrés depuis 6 mois, ce qui pourrait expliquer les lectures incorrectes.</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <User className="w-4 h-4 mr-1" />
                          <span>Ajouté par Fatima Zahra le 16/10/2025</span>
                        </div>
                      </div>
                    </div>

                    <button className="mt-4 px-4 py-2 text-sm font-semibold rounded-xl text-white transition-all hover:shadow-lg" style={{ backgroundColor: '#0066CC' }}>
                      + Ajouter une hypothèse
                    </button>
                  </div>

                  {/* Actions Correctives */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" style={{ color: '#10B981' }} />
                      Actions Correctives
                    </h4>
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-semibold text-gray-800">Calibration des capteurs de température</h5>
                          <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-blue-100 text-blue-700">En cours</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Procéder à la calibration complète de tous les capteurs de température de la chambre froide.</p>
                        <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 mb-3">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            <span>Assigné à: Karim Mansouri</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>Échéance: 20/10/2025</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-semibold text-gray-800">Maintenance préventive du système de refroidissement</h5>
                          <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-yellow-100 text-yellow-700">Planifiée</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Planifier une maintenance complète du système de refroidissement pour identifier tout dysfonctionnement.</p>
                        <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 mb-3">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            <span>Assigné à: Youssef Alami</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>Échéance: 25/10/2025</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button className="mt-4 px-4 py-2 text-sm font-semibold rounded-xl text-white transition-all hover:shadow-lg" style={{ backgroundColor: '#10B981' }}>
                      + Ajouter une action
                    </button>
                  </div>
                </div>
              )}

              {/* Tab: Historique */}
              {activeDetailTab === 'history' && (
                <div className="relative">
                  {/* Timeline */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                  <div className="space-y-6">
                    {[
                      { action: 'Création', date: '15/10/2025 14:30', user: 'Mohammed Benali', details: 'CAPA créée suite à une déviation détectée', color: '#3B82F6' },
                      { action: 'Analyse', date: '15/10/2025 16:20', user: 'Fatima Zahra', details: 'Analyse de cause racine initiée', color: '#8B5CF6' },
                      { action: 'Hypothèse ajoutée', date: '16/10/2025 09:15', user: 'Mohammed Benali', details: 'Hypothèse 1: Défaillance du système de refroidissement', color: '#F59E0B' },
                      { action: 'Action planifiée', date: '16/10/2025 10:30', user: 'Karim Mansouri', details: 'Calibration des capteurs programmée', color: '#10B981' },
                      { action: 'Commentaire', date: '17/10/2025 11:45', user: 'Amina Berrada', details: 'Vérification de la documentation technique', color: '#6B7280' },
                      { action: 'Mise à jour', date: '18/10/2025 14:00', user: 'Mohammed Benali', details: 'Statut modifié: En cours', color: '#0066CC' },
                    ].map((entry, index) => (
                      <div key={index} className="relative pl-12">
                        <div
                          className="absolute left-0 w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: entry.color + '20' }}
                        >
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-semibold text-gray-800">{entry.action}</h5>
                            <span className="text-xs text-gray-500">{entry.date}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{entry.details}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <User className="w-3 h-3 mr-1" />
                            <span>{entry.user}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

