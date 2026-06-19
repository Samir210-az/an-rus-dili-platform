import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function ParentTips() {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    api.get('/parent-tips').then(res => setTips(res.data));
  }, []);

  return (
    <div>
      <h1>👨‍👩‍👧 Evdə Necə Kömək Etməli?</h1>
      <p style={{ color: '#777', marginBottom: 16 }}>
        Valideynlər üçün metodik tövsiyələr — uşağınıza rus dilini evdə necə öyrətməyə kömək edə bilərsiniz.
      </p>
      {tips.length === 0 && <p>Hələ tövsiyə yoxdur.</p>}
      {tips.map(t => (
        <div key={t.id} className="card">
          <strong>{t.title}</strong>
          <p style={{ whiteSpace: 'pre-wrap', marginTop: 6 }}>{t.content}</p>
        </div>
      ))}
    </div>
  );
}
