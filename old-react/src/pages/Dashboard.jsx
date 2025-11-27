import React from 'react';
import Logo from '../components/Logo';
import { Home, FileText, AlertTriangle, CheckCircle, Settings, User, Bell, Search, BarChart3 } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function GenericlabDashboard() {

  const stats = [
    { label: 'CAPA Actives', value: '24', change: '+5 ce mois', icon: FileText },
    { label: 'En Attente', value: '8', change: '+2 ce mois', icon: FileText },
    { label: 'Clôturées', value: '142', change: '+12 ce mois', icon: CheckCircle },
    { label: 'Taux Efficacité', value: '94%', change: '+2% ce mois', icon: BarChart3 }
  ];


  // Données pour les graphiques
  const monthlyData = [
    { mois: 'Jan', actives: 18, clôturées: 15 },
    { mois: 'Fév', actives: 22, clôturées: 18 },
    { mois: 'Mar', actives: 20, clôturées: 22 },
    { mois: 'Avr', actives: 25, clôturées: 20 },
    { mois: 'Mai', actives: 28, clôturées: 24 },
    { mois: 'Juin', actives: 24, clôturées: 28 },
  ];

  const statusData = [
    { name: 'En cours', value: 24, color: '#3B82F6' },
    { name: 'En Attente', value: 8, color: '#F59E0B' },
    { name: 'Clôturées', value: 142, color: '#10B981' },
  ];

  const departmentData = [
    { departement: 'Production', nombre: 45 },
    { departement: 'Qualité', nombre: 38 },
    { departement: 'QA', nombre: 32 },
    { departement: 'Maintenance', nombre: 28 },
    { departement: 'Documentation', nombre: 20 },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo Genericlab */}
        <Logo />

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4">
          <div className="mb-6">
            <button type="button" className="flex items-center space-x-3 px-4 py-3 rounded-xl" style={{ backgroundColor: '#E3F2FD', color: '#0066CC' }}>
              <Home className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </button>
          </div>

          <div className="space-y-1">
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

          <div className="mt-8 pt-6 border-t border-gray-200">
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

        {/* Help Card - Style Purity UI */}
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
            <p className="text-sm text-gray-500 mb-1">Pages / Dashboard</p>
            <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
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
            
            <button className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors flex items-center space-x-2">
              <span>Sign In</span>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8" style={{ backgroundColor: '#F8F9FA' }}>
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: index === 0 ? '#E3F2FD' : index === 1 ? '#FFF3E0' : index === 2 ? '#E8F5E9' : '#E0F7FA' }}>
                    <stat.icon className="w-7 h-7" style={{ color: index === 0 ? '#0066CC' : index === 1 ? '#FF9800' : index === 2 ? '#4CAF50' : '#00BCD4' }} />
                  </div>
                </div>
                <p className="text-sm text-gray-500 font-medium mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Graphiques et Analyses */}
          <div className="mt-8">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-800">Analyses et Statistiques</h3>
              <p className="text-sm text-gray-500">Vue d'ensemble des performances CAPA</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Graphique en barres - Évolution mensuelle */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-800 mb-4">Évolution Mensuelle</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="mois" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="actives" fill="#0066CC" name="CAPA Actives" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="clôturées" fill="#10B981" name="CAPA Clôturées" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Graphique circulaire - Répartition par statut */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-800 mb-4">Répartition par Statut</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Graphique en barres horizontales - Par département */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 col-span-2">
                <h4 className="font-bold text-gray-800 mb-4">CAPA par Département</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={departmentData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis type="number" stroke="#6B7280" />
                    <YAxis dataKey="departement" type="category" stroke="#6B7280" />
                    <Tooltip />
                    <Bar dataKey="nombre" fill="#00BCD4" name="Nombre de CAPA" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

