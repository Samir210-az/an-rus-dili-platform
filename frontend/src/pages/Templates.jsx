import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Templates() {
  const [materials, setMaterials] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const { user } = useAuth();

  const load = () => api.get('/materials?category=oyun').then(res =>
    setMaterials(res.data.filter(m => m.fileUrl))
  );

  useEffect(() => { load(); }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) return;
    const formData = new FormData();
    formData.append('file', file);
    const uploadRes = await api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    await api.post('/materials', {
      category: 'oyun',
      title,
      content: 'Şablon fayl',
      fileUrl: uploadRes.data.fileUrl,
    });
    setTitle(''); setFile(null);
    load();
  };

  return (
    <div>
      <h1>📂 Hazır Şablonlar</h1>
      <p style={{ color: '#777' }}>Test, diktant, fleş-kart şablonları (PDF/şəkil/səs).</p>

      {(user?.role === 'teacher' || user?.role === 'admin' || user?.role === 'super_admin') && (
        <div className="card">
          <h3>Yeni şablon yüklə</h3>
          <form onSubmit={handleUpload} style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
            <input placeholder="Şablon adı" value={title} onChange={e => setTitle(e.target.value)} required />
            <input type="file" onChange={e => setFile(e.target.files[0])} required />
            <button className="btn btn-primary">Yüklə</button>
          </form>
        </div>
      )}

      {materials.map(m => (
        <div key={m.id} className="card">
          <strong>{m.title}</strong>
          <br />
          <a href={m.fileUrl} target="_blank" rel="noopener noreferrer">
            <button className="btn btn-secondary" style={{ marginTop: 8 }}>Yüklə</button>
          </a>
        </div>
      ))}
    </div>
  );
}
