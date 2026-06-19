import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LangProvider } from './context/LangContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import Homeworks from './pages/Homeworks';
import Announcements from './pages/Announcements';
import AdminPanel from './pages/AdminPanel';
import Progress from './pages/Progress';
import Materials from './pages/Materials';
import MaterialDetail from './pages/MaterialDetail';
import ParentTips from './pages/ParentTips';
import Messages from './pages/Messages';
import About from './pages/About';
import Contact from './pages/Contact';
import Templates from './pages/Templates';

function Layout({ children }) {
  const location = useLocation();
  const isLogin = location.pathname === '/';
  return (
    <div className="app-layout">
      {!isLogin && <Navbar />}
      <div className="main-content">{children}</div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
              <Route path="/homeworks" element={<ProtectedRoute><Homeworks /></ProtectedRoute>} />
              <Route path="/announcements" element={<ProtectedRoute><Announcements /></ProtectedRoute>} />
              <Route path="/progress" element={<ProtectedRoute roles={['student']}><Progress /></ProtectedRoute>} />
              <Route path="/materials" element={<ProtectedRoute><Materials /></ProtectedRoute>} />
              <Route path="/materials/:id" element={<ProtectedRoute><MaterialDetail /></ProtectedRoute>} />
              <Route path="/parent-tips" element={<ProtectedRoute roles={['parent', 'admin', 'super_admin']}><ParentTips /></ProtectedRoute>} />
              <Route path="/messages" element={<ProtectedRoute roles={['teacher', 'parent', 'admin', 'super_admin']}><Messages /></ProtectedRoute>} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/templates" element={<ProtectedRoute roles={['teacher', 'admin', 'super_admin']}><Templates /></ProtectedRoute>} />
              <Route path="/admin" element={
                <ProtectedRoute roles={['admin', 'super_admin']}><AdminPanel /></ProtectedRoute>
              } />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </LangProvider>
  );
}
