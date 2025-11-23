import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Tables from './pages/Tables';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UserManagement from './pages/UserManagement';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'tables': return <Tables />;
      case 'profile': return <Profile />;
      case 'users': return <UserManagement />;
      case 'signin': return <SignIn />;
      case 'signup': return <SignUp />;
      default: return <Dashboard />;
    }
  };

  return (
    <div>
      {/* Menu de navigation flottant pour tester */}
      <div className="fixed top-4 right-4 z-50 bg-white rounded-xl shadow-lg p-4 border border-gray-200">
        <p className="text-xs font-bold text-gray-500 mb-2 uppercase">Navigation</p>
        <div className="space-y-2">
          <button 
            onClick={() => setCurrentPage('dashboard')} 
            className="block w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 text-sm font-medium"
            style={{ backgroundColor: currentPage === 'dashboard' ? '#E3F2FD' : 'transparent', color: currentPage === 'dashboard' ? '#0066CC' : '#666' }}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setCurrentPage('tables')}
            className="block w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 text-sm font-medium"
            style={{ backgroundColor: currentPage === 'tables' ? '#E3F2FD' : 'transparent', color: currentPage === 'tables' ? '#0066CC' : '#666' }}
          >
            📋 Gestion de CAPA
          </button>
          <button
            onClick={() => setCurrentPage('profile')}
            className="block w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 text-sm font-medium"
            style={{ backgroundColor: currentPage === 'profile' ? '#E3F2FD' : 'transparent', color: currentPage === 'profile' ? '#0066CC' : '#666' }}
          >
            👤 Profile
          </button>
          <button
            onClick={() => setCurrentPage('users')}
            className="block w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 text-sm font-medium"
            style={{ backgroundColor: currentPage === 'users' ? '#E3F2FD' : 'transparent', color: currentPage === 'users' ? '#0066CC' : '#666' }}
          >
            👥 Utilisateurs
          </button>
          <button
            onClick={() => setCurrentPage('signin')}
            className="block w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 text-sm font-medium"
            style={{ backgroundColor: currentPage === 'signin' ? '#E3F2FD' : 'transparent', color: currentPage === 'signin' ? '#0066CC' : '#666' }}
          >
            🔐 Sign In
          </button>
          <button 
            onClick={() => setCurrentPage('signup')} 
            className="block w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 text-sm font-medium"
            style={{ backgroundColor: currentPage === 'signup' ? '#E3F2FD' : 'transparent', color: currentPage === 'signup' ? '#0066CC' : '#666' }}
          >
            ✍️ Sign Up
          </button>
        </div>
      </div>

      {renderPage()}
    </div>
  );
}

export default App;
