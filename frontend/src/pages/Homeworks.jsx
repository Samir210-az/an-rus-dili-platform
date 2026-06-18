import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Homeworks() {
  const [homeworks, setHomeworks] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    api.get('/homeworks').then(res => setHomeworks(res.data));
  }, []);

  const difficultyColor = { asan: '#4CAF50', orta: '#FFC107', cetin: '#f44336' };

  return (
    <div>
      <h1>📝 Ev Tapşırıqları</h1>
      {homeworks.length === 0 && <p>Hələ tapşırıq yoxdur.</p>}
      {homeworks.map(hw => (
        <div key={hw.id} className="card">
          <strong>{hw.title}</strong>
          <p>{hw.description}</p>
          <p>Son tarix: {new Date(hw.deadline).toLocaleString('az-AZ')}</p>
          <span style={{ background: difficultyColor[hw.difficulty], color: 'white', padding: '4px 10px', borderRadius: 8, fontSize: 13 }}>
            {hw.difficulty}
          </span>
          {user?.role === 'student' && (
            <div style={{ marginTop: 10 }}>
              <textarea placeholder="Cavabınızı yazın..." style={{ width: '100%', padding: 8 }} />
              <button className="btn btn-primary" style={{ marginTop: 8 }}>Göndər</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
