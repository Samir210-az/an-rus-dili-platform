import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const categories = [
  { key: 'danishiq', label: '🗣️ Danışıq', color: '#FF9800' },
  { key: 'oxu', label: '📖 Oxu və Anlama', color: '#2196F3' },
  { key: 'yazi', label: '✍️ Yazı və Orfoqrafiya', color: '#4CAF50' },
  { key: 'qrammatika', label: '📐 Qrammatika', color: '#9C27B0' },
  { key: 'oyun', label: '🎮 Oyun və Əyləncə', color: '#F44336' },
];

export default function Materials() {
  const [active, setActive] = useState('danishiq');
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get(`/materials?category=${active}`).then(res => setItems(res.data));
  }, [active]);

  return (
    <div>
      <h1>📚 Kurs Materialları</h1>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', margin: '16px 0' }}>
        {categories.map(c => (
          <button
            key={c.key}
            className="btn"
            style={{
              background: active === c.key ? c.color : '#eee',
              color: active === c.key ? 'white' : '#333',
            }}
            onClick={() => setActive(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {items.length === 0 && <p>Bu kateqoriyada hələ material yoxdur.</p>}
      {items.map(m => (
        <Link key={m.id} to={`/materials/${m.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card">
            <strong>{m.title}</strong>
            <p style={{ color: '#777' }}>{m.content?.slice(0, 100)}...</p>
            <span style={{ fontSize: 13, background: '#FFF3CD', padding: '3px 8px', borderRadius: 8 }}>
              {m.level} · {m.difficulty}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
