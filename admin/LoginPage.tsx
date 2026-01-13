
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simplified auth for demo logic
    if (password === 'admin123') {
      localStorage.setItem('vk_admin_auth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Incorrect Administrator Password');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="bg-primary p-8 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-4xl">admin_panel_settings</span>
          </div>
          <h2 className="text-2xl font-bold">Admin Access</h2>
          <p className="text-blue-200 text-sm mt-1">V.K Computer Institute Portal</p>
        </div>
        <form className="p-8 space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Administrator Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border-slate-300 focus:ring-primary focus:border-primary py-3 px-4" 
              placeholder="••••••••"
              required 
            />
          </div>
          {error && (
            <p className="text-red-500 text-xs font-bold text-center">{error}</p>
          )}
          <button className="w-full bg-primary hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95">
            UNLOCK DASHBOARD
          </button>
          <div className="text-center">
            <a href="/" className="text-xs text-slate-400 hover:text-primary underline">Return to Website</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
