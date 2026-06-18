import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Announcements() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/announcements').then(res => setItems(res.data));
  }, []);

  return (
    <div>
      <h1>📢 Elanlar</h1>
      {items.length === 0 && <p>Hələ elan yoxdur.</p>}
      {items.map(a => (
        <div key={a.id} className="card">
          <strong>{a.title}</strong>
          <p>{a.message}</p>
        </div>
      ))}
    </div>
  );
}
