import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '12px 24px', background: 'white', boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
    }}>
      <Link to="/dashboard" style={{ fontWeight: 700, fontSize: 20, color: '#FF9800', textDecoration: 'none' }}>
        🎓 AN Mərkəzi
      </Link>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Link to="/schedule">Dərs Cədvəli</Link>
        <Link to="/homeworks">Tapşırıqlar</Link>
        <Link to="/announcements">Elanlar</Link>
        {(user?.role === 'admin' || user?.role === 'super_admin') && (
          <Link to="/admin">Admin Panel</Link>
        )}
        <span>👤 {user?.firstName || user?.username}</span>
        <button className="btn btn-secondary" onClick={() => { logout(); navigate('/'); }}>
          Çıxış
        </button>
      </div>
    </nav>
  );
}
