import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function Dashboard() {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    api.get('/announcements').then(res => setAnnouncements(res.data.slice(0, 5)));
  }, []);

  return (
    <div>
      <h1>Xoş gəlmisiniz, {user?.firstName || user?.username}! 👋</h1>
      <p style={{ color: '#777', marginBottom: 20 }}>
        Rolunuz: {user?.role === 'super_admin' ? 'Super Admin' :
          user?.role === 'admin' ? 'Admin' :
          user?.role === 'teacher' ? 'Müəllim' :
          user?.role === 'student' ? 'Şagird' : 'Valideyn'}
      </p>

      <div className="card">
        <h3>📢 Son Elanlar</h3>
        {announcements.length === 0 && <p>Hələ elan yoxdur.</p>}
        {announcements.map(a => (
          <div key={a.id} style={{ borderBottom: '1px solid #eee', padding: '8px 0' }}>
            <strong>{a.title}</strong>
            <p>{a.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
