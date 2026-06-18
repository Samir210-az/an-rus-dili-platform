import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Schedule() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    api.get('/lessons').then(res => setLessons(res.data));
  }, []);

  return (
    <div>
      <h1>📅 Dərs Cədvəli</h1>
      {lessons.length === 0 && <p>Hələ dərs planlaşdırılmayıb.</p>}
      {lessons.map(l => (
        <div key={l.id} className="card">
          <strong>{l.topic}</strong>
          <p>{l.date} | {l.startTime} - {l.endTime} | Otaq: {l.roomNumber}</p>
          <span style={{ background: '#E3F2FD', padding: '4px 10px', borderRadius: 8, fontSize: 13 }}>
            {l.category}
          </span>
        </div>
      ))}
    </div>
  );
}
