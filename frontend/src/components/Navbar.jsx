import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { lang, changeLang, t } = useLang();
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
        <Link to="/schedule">{t('schedule')}</Link>
        <Link to="/materials">📚 Materiallar</Link>
        <Link to="/homeworks">{t('homeworks')}</Link>
        <Link to="/announcements">{t('announcements')}</Link>
        {(user?.role === 'admin' || user?.role === 'super_admin') && (
          <Link to="/admin">{t('adminPanel')}</Link>
        )}
        {user?.role === 'student' && <Link to="/progress">{t('progress')}</Link>}
        {user?.role === 'parent' && <Link to="/parent-tips">👨‍👩‍👧 Tövsiyələr</Link>}
        {['teacher', 'parent', 'admin', 'super_admin'].includes(user?.role) && (
          <Link to="/messages">💬 Mesajlar</Link>
        )}
        {['teacher', 'admin', 'super_admin'].includes(user?.role) && (
          <Link to="/templates">📂 Şablonlar</Link>
        )}
        <Link to="/about">Haqqımızda</Link>
        <Link to="/contact">Əlaqə</Link>
        <select value={lang} onChange={e => changeLang(e.target.value)} style={{ borderRadius: 8, padding: 4 }}>
          <option value="az">AZ</option>
          <option value="ru">RU</option>
        </select>
        <span>👤 {user?.firstName || user?.username}</span>
        <button className="btn btn-secondary" onClick={() => { logout(); navigate('/'); }}>
          {t('logout')}
        </button>
      </div>
    </nav>
  );
}
