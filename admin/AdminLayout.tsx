
import React, { useEffect } from 'react';
import { Outlet, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { db } from '../services/dbService';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const content = db.getContent();
  const isAuthenticated = localStorage.getItem('vk_admin_auth') === 'true';

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    localStorage.removeItem('vk_admin_auth');
    navigate('/admin/login');
  };

  const menuItems = [
    { label: 'Dashboard', icon: 'dashboard', path: '/admin/dashboard' },
    { label: 'Courses', icon: 'school', path: '/admin/courses' },
    { label: 'Students', icon: 'group', path: '/admin/students' },
    { label: 'Certificates', icon: 'verified', path: '/admin/certificates' },
    { label: 'Verify Logs', icon: 'monitoring', path: '/admin/logs' },
    { label: 'Contact Leads', icon: 'alternate_email', path: '/admin/leads' },
    { label: 'Site Settings', icon: 'settings', path: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-background-dark overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-blue-600/50">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-lg">
              <span className="material-symbols-outlined text-primary font-bold">computer</span>
            </div>
            <div>
              <h1 className="font-bold leading-tight tracking-wider uppercase">V.K ADMIN</h1>
              <p className="text-[10px] text-blue-200">Management v4.0</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 mt-6 px-4 space-y-1 overflow-y-auto">
          {menuItems.map(item => (
            <Link 
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                location.pathname === item.path ? 'bg-white/10 text-white shadow-lg' : 'text-blue-100 hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 mt-auto border-t border-blue-600/50">
          <button 
            onClick={handleLogout}
            className="w-full py-3 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">logout</span> LOGOUT
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto relative">
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b px-8 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold capitalize">{location.pathname.split('/').pop()?.replace('-', ' ')}</h2>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-xl">
               <img src={content.directorPhoto} className="w-8 h-8 rounded-full object-cover border border-slate-300" alt="Admin Portrait" />
               <span className="text-sm font-bold">{content.directorName}</span>
             </div>
          </div>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
