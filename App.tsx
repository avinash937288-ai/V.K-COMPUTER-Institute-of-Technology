
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import VerifyPage from './pages/VerifyPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './admin/Dashboard';
import AdminLogin from './admin/LoginPage';
import AdminLayout from './admin/AdminLayout';
import AdminCourses from './admin/AdminCourses';
import AdminStudents from './admin/AdminStudents';
import AdminCertificates from './admin/AdminCertificates';
import AdminLogs from './admin/AdminLogs';
import AdminLeads from './admin/AdminLeads';
import AdminSettings from './admin/AdminSettings';

const Navbar = () => {
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  if (isAdminPath) return null;

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="material-symbols-outlined text-primary text-4xl">computer</span>
          <div>
            <h1 className="font-bold text-xl leading-none tracking-tight text-primary">V.K COMPUTER</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">Institute of Technology</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300 hover:text-primary transition-colors lift-hover px-2 py-1" to="/">
            <span className="material-symbols-outlined text-[18px]">home</span>Home
          </Link>
          <Link className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300 hover:text-primary transition-colors lift-hover px-2 py-1" to="/courses">
            <span className="material-symbols-outlined text-[18px]">school</span>Courses
          </Link>
          <Link className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300 hover:text-primary transition-colors lift-hover px-2 py-1" to="/verify">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>Verify
          </Link>
          <Link className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300 hover:text-primary transition-colors lift-hover px-2 py-1" to="/contact">
            <span className="material-symbols-outlined text-[18px]">alternate_email</span>Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors lift-hover" onClick={toggleTheme}>
            <span className="material-symbols-outlined text-xl dark:hidden">dark_mode</span>
            <span className="material-symbols-outlined text-xl hidden dark:inline">light_mode</span>
          </button>
          <Link className="bg-primary text-white px-5 py-2.5 rounded font-bold text-sm lift-hover flex items-center gap-2 shadow-sm" to="/verify">
            <span className="material-symbols-outlined text-sm">verified</span>
            Verify Now
          </Link>
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  if (isAdminPath) return null;

  return (
    <footer className="bg-slate-950 text-slate-300 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center space-x-2 mb-8">
              <span className="material-symbols-outlined text-blue-500 text-4xl">computer</span>
              <h1 className="font-bold text-xl leading-none tracking-tight text-white">V.K COMPUTER</h1>
            </div>
            <p className="text-slate-400 leading-relaxed mb-8 font-medium">
              Leading computer education center providing quality technical training and professional certifications to empower the youth for digital careers.
            </p>
          </div>
          <div>
            <h5 className="text-white font-bold text-lg mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">link</span>Quick Links
            </h5>
            <ul className="space-y-4">
              <li><Link className="hover:text-primary transition-colors font-medium lift-hover inline-block" to="/">Home</Link></li>
              <li><Link className="hover:text-primary transition-colors font-medium lift-hover inline-block" to="/courses">Courses</Link></li>
              <li><Link className="hover:text-primary transition-colors font-medium lift-hover inline-block" to="/verify">Verify Certificate</Link></li>
              <li><Link className="hover:text-primary transition-colors font-medium lift-hover inline-block" to="/admin/login">Admin Login</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold text-lg mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">menu_book</span>Courses
            </h5>
            <ul className="space-y-4 text-sm">
              <li>ADCA & DCA</li>
              <li>Tally Prime</li>
              <li>CCC</li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold text-lg mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">contact_support</span>Contact
            </h5>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start space-x-3">
                <span className="material-symbols-outlined text-blue-500">location_on</span>
                <span className="font-medium text-slate-400">Sikariganj Road, Old UCO Bank, Uruwa Bazar, PIN - 273407</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="material-symbols-outlined text-blue-500">phone</span>
                <span className="font-medium text-slate-400">+91 9125914320</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-10 border-t border-slate-900 text-center text-sm text-slate-500">
          <p className="font-medium">© 2024 V.K Computer Institute. All Rights Reserved. | ISO Certified Institute</p>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/verify" element={<VerifyPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="certificates" element={<AdminCertificates />} />
              <Route path="logs" element={<AdminLogs />} />
              <Route path="leads" element={<AdminLeads />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
